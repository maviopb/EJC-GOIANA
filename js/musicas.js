
// ==========================================
// EJC GOIANA - BLOCO 05
// MÚSICAS QUE MARCARAM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Link único para todas as músicas
    const PLAYLIST =
        "https://open.spotify.com/playlist/0hHUy0neROGA5oVO7QVEei";

    // As 14 músicas selecionadas
    const musicas = [
        {
            titulo: "Casa",
            artista: "Colo de Deus",
            capa: "casa.jpg"
        },
        {
            titulo: "Alma Missionária",
            artista: "Ziza Fernandes",
            capa: "alma-missionaria.jpg"
        },
        {
            titulo: "Foi por Você",
            artista: "Anjos de Resgate",
            capa: "foi-por-voce.jpg"
        },
        {
            titulo: "Teus Planos",
            artista: "Juninho Cassimiro e Frei Gilson",
            capa: "teus-planos.jpg"
        },
        {
            titulo: "Abraço de Pai — Ao Vivo",
            artista: "Ministério Adoração e Vida",
            capa: "abraco-de-pai.jpg"
        },
        {
            titulo: "Minha Essência",
            artista: "Thiago Brado",
            capa: "minha-essencia.jpg"
        },
        {
            titulo: "Desperta — Ao Vivo",
            artista: "Colo de Deus",
            capa: "desperta.jpg"
        },
        {
            titulo: "Tua Família",
            artista: "Anjos de Resgate",
            capa: "tua-familia.jpg"
        },
        {
            titulo: "Romanos 12",
            artista: "Fraternidade São João Paulo II",
            capa: "romanos-12.jpg"
        },
        {
            titulo: "Canção de Pedro",
            artista: "Banda DOM",
            capa: "cancao-de-pedro.jpg"
        },
        {
            titulo: "Eis-Me Aqui",
            artista: "Colo de Deus",
            capa: "eis-me-aqui.jpg"
        },
        {
            titulo: "Recomeçar — Ao Vivo",
            artista: "Colo de Deus",
            capa: "recomecar.jpg"
        },
        {
            titulo: "O Poço",
            artista: "Juninho Cassimiro",
            capa: "o-poco.jpg"
        },
        {
            titulo: "Jardim",
            artista: "Fraternidade São João Paulo II",
            capa: "jardim.jpg"
        }
    ];

    const trilho = document.getElementById("musicasTrilho");

    if (!trilho) return;

    // Cria cada card
    function criarCard(musica, indice, duplicado = false) {

        const link = document.createElement("a");

        link.className = "musica-card";
        link.href = PLAYLIST;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        if (duplicado) {
            link.setAttribute("aria-hidden", "true");
            link.tabIndex = -1;
        } else {
            link.setAttribute(
                "aria-label",
                `${musica.titulo}, ${musica.artista}. Abrir playlist completa no Spotify`
            );
        }

        const numero = String(indice + 1).padStart(2, "0");

        const arte = document.createElement("div");
        arte.className = "musica-arte";

        const vinil = document.createElement("div");
        vinil.className = "musica-vinil";
        vinil.setAttribute("aria-hidden", "true");

        const capa = document.createElement("img");
        capa.className = "musica-capa";
        capa.src = `assets/imagens/musicas/${musica.capa}`;
        capa.alt = `Capa de ${musica.titulo}`;
        capa.loading = "lazy";
        capa.decoding = "async";

        const play = document.createElement("span");
        play.className = "musica-play";
        play.textContent = "▶";
        play.setAttribute("aria-hidden", "true");

        arte.appendChild(vinil);
        arte.appendChild(capa);
        arte.appendChild(play);

        const info = document.createElement("div");
        info.className = "musica-info";

        const numeroElemento = document.createElement("span");
        numeroElemento.className = "musica-numero";
        numeroElemento.textContent = `FAIXA ${numero}`;

        const titulo = document.createElement("h3");
        titulo.className = "musica-titulo";
        titulo.textContent = musica.titulo;

        const artista = document.createElement("p");
        artista.className = "musica-artista";
        artista.textContent = musica.artista;

        info.appendChild(numeroElemento);
        info.appendChild(titulo);
        info.appendChild(artista);

        link.appendChild(arte);
        link.appendChild(info);

        return link;
    }

    // Conjunto original de 14 músicas
    musicas.forEach((musica, indice) => {
        trilho.appendChild(criarCard(musica, indice));
    });

    // Cópia para movimento infinito
    musicas.forEach((musica, indice) => {
        trilho.appendChild(criarCard(musica, indice, true));
    });

    // Distância exata de um conjunto completo
    function atualizarDistancia() {

        const primeira = trilho.children[0];
        const primeiraCopia = trilho.children[musicas.length];

        if (!primeira || !primeiraCopia) return;

        const distancia =
            primeiraCopia.offsetLeft - primeira.offsetLeft;

        trilho.style.setProperty(
            "--musicas-distancia",
            `${distancia}px`
        );
    }

    atualizarDistancia();

    window.addEventListener("resize", atualizarDistancia);

    // Ajusta a velocidade conforme o tamanho do conjunto
    function atualizarVelocidade() {

        const distancia = parseFloat(
            trilho.style.getPropertyValue("--musicas-distancia")
        );

        if (!distancia) return;

        // Aproximadamente 45 pixels por segundo
        const duracao = distancia / 45;

        trilho.style.setProperty(
            "--musicas-duracao",
            `${duracao}s`
        );
    }

    function atualizarCarrossel() {
        atualizarDistancia();
        atualizarVelocidade();
    }

    atualizarCarrossel();

    window.addEventListener("resize", atualizarCarrossel);

});
