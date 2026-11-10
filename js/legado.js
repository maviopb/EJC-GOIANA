
// ==========================================
// BLOCO 06 - O QUE PERMANECE
// EJC GOIANA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const secao = document.querySelector(".legado-secao");
    if (!secao) return;

    const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ======================================
    // 1. REVELAR TEXTO DURANTE O SCROLL
    // ======================================

    const elementos = secao.querySelectorAll(".legado-revelar");

    if ("IntersectionObserver" in window && !reduzirMovimento) {

        const observador = new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visivel");
                        observador.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        elementos.forEach(elemento => {
            observador.observe(elemento);
        });

    } else {

        elementos.forEach(elemento => {
            elemento.classList.add("visivel");
        });

    }

    // ======================================
    // 2. PARTÍCULAS LUMINOSAS
    // ======================================

    const recipiente = document.getElementById("legadoParticulas");

    if (recipiente && !reduzirMovimento) {

        const quantidade = 32;

        for (let i = 0; i < quantidade; i++) {

            const particula = document.createElement("span");
            particula.className = "legado-particula";

            const x = Math.random() * 100;
            const y = Math.random() * 100;

            const tamanho = 2 + Math.random() * 4;
            const duracao = 8 + Math.random() * 10;
            const atraso = Math.random() * -15;

            particula.style.left = `${x}%`;
            particula.style.top = `${y}%`;

            particula.style.setProperty(
                "--tamanho",
                `${tamanho}px`
            );

            particula.style.setProperty(
                "--duracao",
                `${duracao}s`
            );

            particula.style.animationDelay = `${atraso}s`;

            recipiente.appendChild(particula);
        }
    }

    // ======================================
    // 3. LUZ QUE ACOMPANHA O CURSOR
    // ======================================

    if (!reduzirMovimento) {

        secao.addEventListener("pointermove", evento => {

            if (evento.pointerType === "touch") return;

            const area = secao.getBoundingClientRect();

            const x = (
                (evento.clientX - area.left) / area.width
            ) * 100;

            const y = (
                (evento.clientY - area.top) / area.height
            ) * 100;

            secao.style.setProperty("--luz-x", `${x}%`);
            secao.style.setProperty("--luz-y", `${y}%`);

        });

        secao.addEventListener("pointerleave", () => {
            secao.style.setProperty("--luz-x", "50%");
            secao.style.setProperty("--luz-y", "45%");
        });

    }

});
