
// =========================================
// EJC GOIANA - BLOCO 01
// ANIMAÇÕES E INTERATIVIDADE
// =========================================


// ELEMENTOS DO HTML

const frasePrincipal = document.getElementById("frasePrincipal");
const fraseSecundaria = document.getElementById("fraseSecundaria");

const numeroFrase = document.getElementById("numeroFrase");

const botaoMenu = document.getElementById("botaoMenu");
const linksMenu = document.getElementById("linksMenu");

const video = document.getElementById("videoAbertura");


// =========================================
// FRASES DA ABERTURA
// =========================================

const frases = [
    {
        principal: "Tudo começa numa sexta-feira...",
        secundaria: "E algumas experiências permanecem para sempre."
    },

    {
        principal: "Existem encontros que mudam histórias.",
        secundaria: "Momentos que palavras não conseguem explicar."
    },

    {
        principal: "E talvez a próxima história seja a sua.",
        secundaria: "Encontro de Jovens com Cristo • Goiana"
    }
];


// =========================================
// CONFIGURAÇÕES DAS FRASES
// =========================================

let indiceAtual = 0;

const tempoVisivel = 5500;
const tempoTransicao = 1100;

let temporizador;


// =========================================
// MOSTRAR FRASE
// =========================================

function mostrarFrase() {

    const frase = frases[indiceAtual];

    frasePrincipal.textContent = frase.principal;
    fraseSecundaria.textContent = frase.secundaria;

    numeroFrase.textContent =
        String(indiceAtual + 1).padStart(2, "0");

    // Pequeno intervalo para iniciar a animação
    requestAnimationFrame(() => {

        frasePrincipal.classList.add("visivel");

        setTimeout(() => {
            fraseSecundaria.classList.add("visivel");
        }, 350);

    });

    // Aguarda antes de trocar
    temporizador = setTimeout(
        esconderFrase,
        tempoVisivel
    );

}


// =========================================
// ESCONDER E TROCAR FRASE
// =========================================

function esconderFrase() {

    frasePrincipal.classList.remove("visivel");
    fraseSecundaria.classList.remove("visivel");

    setTimeout(() => {

        indiceAtual++;

        if (indiceAtual >= frases.length) {
            indiceAtual = 0;
        }

        mostrarFrase();

    }, tempoTransicao);

}



// ==========================================
// INICIAR ANIMAÇÃO E VÍDEO MOBILE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("videoAbertura");

    if (video) {

        // Reforça os atributos para celulares
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        // Tenta iniciar o vídeo
        function iniciarVideo() {

            if (!video.paused) return;

            const reproducao = video.play();

            if (reproducao &&
                typeof reproducao.catch === "function") {

                reproducao.catch(() => {
                    console.log(
                        "Reprodução automática bloqueada pelo navegador."
                    );
                });

            }
        }

        iniciarVideo();

        // Tenta novamente quando a aba fica visível
        document.addEventListener("visibilitychange", () => {

            if (!document.hidden) {
                iniciarVideo();
            }

        });

        // Interação do visitante pode liberar reprodução
        document.addEventListener(
            "touchstart",
            iniciarVideo,
            { once: true, passive: true }
        );

        document.addEventListener(
            "click",
            iniciarVideo,
            { once: true }
        );

    }

    // Mantém as frases cinematográficas
    mostrarFrase();

});



// ==========================================
// MENU FLUTUANTE - EJC GOIANA
// ABRIR, FECHAR E NAVEGAR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("botaoMenu");
    const menu = document.getElementById("linksMenu");

    if (!botao || !menu) {
        console.warn("Elementos do menu não encontrados.");
        return;
    }

    // Abre ou fecha o menu
    function alternarMenu() {
        const aberto = menu.classList.toggle("aberto");

        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    }

    // Fecha o menu
    function fecharMenu() {
        menu.classList.remove("aberto");
        botao.setAttribute("aria-expanded", "false");
        botao.setAttribute("aria-label", "Abrir menu");
    }

    // Clique no botão
    botao.addEventListener("click", (evento) => {
        evento.stopPropagation();
        alternarMenu();
    });

    // Fecha ao selecionar uma seção
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (evento) => {
        if (
            !menu.contains(evento.target) &&
            !botao.contains(evento.target)
        ) {
            fecharMenu();
        }
    });

    // Fecha ao pressionar ESC
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
            botao.focus();
        }
    });

});


document.querySelectorAll(".links-menu a").forEach(link => {

    link.addEventListener("click", () => {

        linksMenu.classList.remove("aberto");

        botaoMenu.setAttribute("aria-expanded", "false");

        botaoMenu.setAttribute("aria-label", "Abrir menu");

    });

});


// =========================================
// FECHAR MENU COM ESC
// =========================================

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        linksMenu.classList.remove("aberto");

        botaoMenu.setAttribute("aria-expanded", "false");

        botaoMenu.setAttribute("aria-label", "Abrir menu");

    }

});


// =========================================
// PAUSAR ANIMAÇÃO EM ABA INATIVA
// =========================================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        clearTimeout(temporizador);

    } else {

        clearTimeout(temporizador);

        frasePrincipal.classList.remove("visivel");
        fraseSecundaria.classList.remove("visivel");

        setTimeout(mostrarFrase, 100);

    }

});

// ==========================================
// BLOCO 02 - EJC GOIANA
// ANIMAÇÕES E CARDS INTERATIVOS
// ==========================================

// Verifica preferência de movimento
const movimentoReduzidoEJC = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// ==========================================
// REVELAR ELEMENTOS DURANTE O SCROLL
// ==========================================

const elementosRevelarEJC = document.querySelectorAll(
    ".sobre-ejc .revelar"
);

if (
    movimentoReduzidoEJC ||
    !("IntersectionObserver" in window)
) {

    elementosRevelarEJC.forEach(elemento => {
        elemento.classList.add("ativo");
    });

} else {

    const observadorEJC = new IntersectionObserver(
        (entradas, observador) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("ativo");

                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    elementosRevelarEJC.forEach(elemento => {
        observadorEJC.observe(elemento);
    });

}


// ==========================================
// EFEITO 3D NOS CARDS
// ==========================================

const cardsInterativosEJC = document.querySelectorAll(
    ".sobre-card"
);

const permite3DEJC = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches && !movimentoReduzidoEJC;

if (permite3DEJC) {

    cardsInterativosEJC.forEach(card => {

        card.addEventListener("pointermove", (evento) => {

            const area = card.getBoundingClientRect();

            const x = evento.clientX - area.left;
            const y = evento.clientY - area.top;

            const centroX = area.width / 2;
            const centroY = area.height / 2;

            const rotacaoY =
                ((x - centroX) / centroX) * 5;

            const rotacaoX =
                -((y - centroY) / centroY) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotacaoX}deg)
                 rotateY(${rotacaoY}deg)
                 translateY(-6px)`;

            // Reflexo acompanha o cursor
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });

    });

}

// ==========================================
// ANO AUTOMÁTICO DO RODAPÉ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const anoRodape = document.getElementById("anoRodape");

    if (anoRodape) {
        anoRodape.textContent = new Date().getFullYear();
    }

});
