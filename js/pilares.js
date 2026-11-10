
// ==========================================
// EJC GOIANA - CINCO PILARES INTERATIVOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const orbita = document.getElementById("pilaresOrbita");
    const painel = document.getElementById("pilarPainel");
    const titulo = document.getElementById("pilarTitulo");
    const descricao = document.getElementById("pilarDescricao");
    const fechar = document.getElementById("fecharPilar");

    if (!orbita || !painel || !titulo || !descricao || !fechar) {
        return;
    }

    // Textos apresentados ao clicar nos pilares
    const pilares = {

        alegria: {
            titulo: "Alegria",
            descricao:
                "A alegria é uma expressão da nossa fé. " +
                "É descobrir a beleza de caminhar com Cristo, " +
                "compartilhando sorrisos, esperança e amor."
        },

        oracao: {
            titulo: "Oração",
            descricao:
                "Na oração, fortalecemos nossa intimidade " +
                "com Deus. É o momento de escutar, agradecer, " +
                "confiar e entregar a Ele nossa caminhada."
        },

        simplicidade: {
            titulo: "Simplicidade",
            descricao:
                "Ser simples é reconhecer o valor do essencial. " +
                "É acolher cada pessoa com humildade, " +
                "autenticidade e um coração aberto."
        },

        doacao: {
            titulo: "Doação",
            descricao:
                "Doar-se é colocar nossos dons a serviço " +
                "do próximo. É oferecer tempo, presença " +
                "e cuidado, seguindo o exemplo de Cristo."
        },

        pobreza: {
            titulo: "Pobreza",
            descricao:
                "A pobreza, como valor espiritual, " +
                "nos convida ao desapego, à humildade " +
                "e à solidariedade com quem mais precisa."
        }

    };

    const botoes = orbita.querySelectorAll(".pilar-item");

    function abrirPilar(chave, botao) {

        const pilar = pilares[chave];

        if (!pilar) return;

        titulo.textContent = pilar.titulo;
        descricao.textContent = pilar.descricao;

        painel.hidden = false;

        botoes.forEach(item => {
            const ativo = item === botao;

            item.classList.toggle("ativo", ativo);
            item.setAttribute("aria-pressed", String(ativo));
        });

        painel.classList.remove("pilar-entrando");

        // Reinicia a animação
        void painel.offsetWidth;

        painel.classList.add("pilar-entrando");
    }

    function fecharPainel() {

        painel.hidden = true;
        painel.classList.remove("pilar-entrando");

        botoes.forEach(item => {
            item.classList.remove("ativo");
            item.setAttribute("aria-pressed", "false");
        });
    }

    botoes.forEach(botao => {

        botao.setAttribute("aria-pressed", "false");

        botao.addEventListener("click", () => {

            const chave = botao.dataset.pilar;

            if (
                botao.classList.contains("ativo") &&
                !painel.hidden
            ) {
                fecharPainel();
                return;
            }

            abrirPilar(chave, botao);
        });
    });

    fechar.addEventListener("click", fecharPainel);

    document.addEventListener("keydown", evento => {

        if (evento.key === "Escape" && !painel.hidden) {
            fecharPainel();
        }
    });

    // Revelação dos pilares ao entrar na tela
    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            entradas => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        orbita.classList.add("visivel");

                        observador.unobserve(entrada.target);
                    }
                });

            },
            {
                threshold: 0.15
            }
        );

        observador.observe(orbita);

    } else {

        orbita.classList.add("visivel");
    }

});
