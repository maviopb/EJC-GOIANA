
// ==========================================
// EJC GOIANA - GALERIA DE 23 ANOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_FOTOS = 50;

    const fotos = Array.from(
        { length: TOTAL_FOTOS },
        (_, i) => {
            const numero = String(i + 1).padStart(2, "0");

            return {
                src: `assets/imagens/historia/foto-${numero}.jpg`,
                alt: `Memória ${i + 1} do EJC Goiana`
            };
        }
    );

    const linhas = [
        document.getElementById("historiaLinha1"),
        document.getElementById("historiaLinha2"),
        document.getElementById("historiaLinha3")
    ];

    const lightbox = document.getElementById("historiaLightbox");
    const imagemAmpliada = document.getElementById("historiaImagemAmpliada");
    const contador = document.getElementById("historiaContador");

    const botaoFechar = document.getElementById("historiaFechar");
    const botaoAnterior = document.getElementById("historiaAnterior");
    const botaoProxima = document.getElementById("historiaProxima");

    if (linhas.some(linha => !linha) || !lightbox) return;

    let fotoAtual = 0;
    let ultimoFoco = null;

    // Distribui as fotos entre as três fileiras
    const grupos = [[], [], []];

    fotos.forEach((foto, indice) => {
        grupos[indice % 3].push({
            ...foto,
            indiceOriginal: indice
        });
    });

    // Cria os elementos das fotos
    function criarFoto(foto, duplicada = false) {

        const botao = document.createElement("button");

        botao.className = "historia-foto";
        botao.type = "button";
        botao.setAttribute("aria-label", `Ampliar ${foto.alt}`);

        const img = document.createElement("img");

        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy";
        img.decoding = "async";

        botao.appendChild(img);

        if (duplicada) {
            botao.setAttribute("aria-hidden", "true");
            botao.tabIndex = -1;
        } else {
            botao.addEventListener("click", () => {
                abrirFoto(foto.indiceOriginal);
            });
        }

        return botao;
    }

    // Monta as três faixas
    linhas.forEach((linha, indiceLinha) => {

        const grupo = grupos[indiceLinha];

        // Conjunto original
        grupo.forEach(foto => {
            linha.appendChild(criarFoto(foto));
        });

        // Cópia para loop infinito
        grupo.forEach(foto => {
            linha.appendChild(criarFoto(foto, true));
        });

        // Duração diferente por linha
        const duracoes = [85, 95, 80];

        linha.style.setProperty(
            "--duracao",
            `${duracoes[indiceLinha]}s`
        );

        // Mede a largura exata da primeira metade
        function atualizarDistancia() {

            const primeiro = linha.children[0];
            const primeiroDuplicado = linha.children[grupo.length];

            if (!primeiro || !primeiroDuplicado) return;

            const distancia =
                primeiroDuplicado.offsetLeft - primeiro.offsetLeft;

            linha.style.setProperty(
                "--distancia",
                `${distancia}px`
            );
        }

        atualizarDistancia();

        window.addEventListener("resize", atualizarDistancia);

    });

    // ======================================
    // LIGHTBOX
    // ======================================

    function abrirFoto(indice) {

        fotoAtual = indice;
        ultimoFoco = document.activeElement;

        atualizarLightbox();

        lightbox.hidden = false;
        document.body.style.overflow = "hidden";

        botaoFechar.focus();
    }

    function atualizarLightbox() {

        imagemAmpliada.src = fotos[fotoAtual].src;
        imagemAmpliada.alt = fotos[fotoAtual].alt;

        contador.textContent =
            `${fotoAtual + 1} / ${TOTAL_FOTOS}`;
    }

    function fecharFoto() {

        lightbox.hidden = true;
        document.body.style.overflow = "";

        if (ultimoFoco && ultimoFoco.focus) {
            ultimoFoco.focus();
        }
    }

    function proximaFoto() {

        fotoAtual = (fotoAtual + 1) % TOTAL_FOTOS;
        atualizarLightbox();
    }

    function anteriorFoto() {

        fotoAtual =
            (fotoAtual - 1 + TOTAL_FOTOS) % TOTAL_FOTOS;

        atualizarLightbox();
    }

    botaoFechar.addEventListener("click", fecharFoto);
    botaoProxima.addEventListener("click", proximaFoto);
    botaoAnterior.addEventListener("click", anteriorFoto);

    lightbox.addEventListener("click", evento => {
        if (evento.target === lightbox) {
            fecharFoto();
        }
    });

    document.addEventListener("keydown", evento => {

        if (lightbox.hidden) return;

        if (evento.key === "Escape") fecharFoto();
        if (evento.key === "ArrowRight") proximaFoto();
        if (evento.key === "ArrowLeft") anteriorFoto();

        if (evento.key === "Tab") {
            const controles = [
                botaoFechar,
                botaoAnterior,
                botaoProxima
            ];

            const indice = controles.indexOf(document.activeElement);

            if (evento.shiftKey && indice === 0) {
                evento.preventDefault();
                botaoProxima.focus();
            } else if (!evento.shiftKey && indice === 2) {
                evento.preventDefault();
                botaoFechar.focus();
            }
        }
    });

});
