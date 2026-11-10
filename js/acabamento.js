
// ==========================================
// EJC GOIANA - ANIMAÇÕES DE ACABAMENTO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Selecionamos somente elementos que ainda
    // não utilizam animações próprias de entrada.

    const seletores = [
        ".historia-cabecalho",
        ".musicas-cabecalho",
        ".musicas-playlist",
        ".rodape-identidade",
        ".rodape-navegacao",
        ".rodape-conexoes"
    ];

    const elementos = document.querySelectorAll(
        seletores.join(", ")
    );

    // Não aplica animações quando o usuário
    // prefere movimento reduzido.

    if (
        movimentoReduzido ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }

    // Observador das entradas na tela

    const observador = new IntersectionObserver(
        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "ejc-visivel"
                    );

                    observer.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px 40px 0px"
        }
    );

    elementos.forEach((elemento) => {

        elemento.classList.add("ejc-entrada");

        observador.observe(elemento);

    });

});
