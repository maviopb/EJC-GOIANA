
/* =========================================
   EJC GOIANA — JARDIM DAS MEMÓRIAS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const jardim = document.querySelector(".jardim-ejc");
    const flores = document.getElementById("jardim-flores");
    const particulas = document.getElementById("jardim-particulas");
    const memoria = document.getElementById("jardim-memoria");

    if (!jardim || !flores || !particulas || !memoria) return;

    // HISTÓRIA DOS 11 ENCONTROS

    const encontros = [
        {
            edicao: "I",
            ano: 2003,
            data: "19, 20 e 21 de setembro",
            cor: "#E99A50",
            altura: 275,
            petalas: 8
        },
        {
            edicao: "II",
            ano: 2005,
            data: "22, 23 e 24 de julho",
            cor: "#8970BB",
            altura: 345,
            petalas: 7
        },
        {
            edicao: "III",
            ano: 2007,
            data: "13, 14 e 15 de julho",
            cor: "#CB77B0",
            altura: 240,
            petalas: 9
        },
        {
            edicao: "IV",
            ano: 2011,
            data: "09, 10 e 11 de setembro",
            cor: "#80B879",
            altura: 375,
            petalas: 8
        },
        {
            edicao: "V",
            ano: 2013,
            data: "06, 07 e 08 de setembro",
            cor: "#D85B61",
            altura: 285,
            petalas: 7
        },
        {
            edicao: "VI",
            ano: 2015,
            data: "31 de julho a 02 de agosto",
            cor: "#E6BC55",
            altura: 350,
            petalas: 10
        },
        {
            edicao: "VII",
            ano: 2017,
            data: "27, 28 e 29 de outubro",
            cor: "#6C93CF",
            altura: 260,
            petalas: 8
        },
        {
            edicao: "VIII",
            ano: 2019,
            data: "31 de agosto a 02 de setembro",
            cor: "#E78B49",
            altura: 385,
            petalas: 7
        },
        {
            edicao: "IX",
            ano: 2022,
            data: "09, 10 e 11 de setembro",
            cor: "#BB659D",
            altura: 300,
            petalas: 9
        },
        {
            edicao: "X",
            ano: 2024,
            data: "13, 14 e 15 de setembro",
            cor: "#65A67E",
            altura: 350,
            petalas: 8
        },
        {
            edicao: "XI",
            ano: 2025,
            data: "24, 25 e 26 de outubro",
            cor: "#CE5359",
            altura: 280,
            petalas: 7
        }
    ];

    // FUNÇÃO PARA CRIAR CADA FLOR

    function criarFlor(encontro, indice) {

        const flor = document.createElement("button");

        flor.type = "button";
        flor.className = "jardim-flor";

        flor.setAttribute(
            "aria-label",
            `${encontro.edicao} EJC Goiana, ${encontro.ano}, ${encontro.data}`
        );

        flor.setAttribute("aria-pressed", "false");

        flor.style.setProperty(
            "--altura-flor",
            `${encontro.altura}px`
        );

        flor.style.setProperty(
            "--cor-flor",
            encontro.cor
        );

        flor.style.setProperty(
            "--atraso-flor",
            `${indice * 0.22}s`
        );

        flor.style.setProperty(
            "--tempo-brisa",
            `${3 + Math.random() * 3}s`
        );

        const id = `flor-ejc-${indice}`;

        const altura = encontro.altura;
        const topo = 58;

        const curva = indice % 2 === 0 ? -16 : 16;

        let petalasExternas = "";
        let petalasInternas = "";
        let detalhesMiolo = "";

        // CAMADA EXTERNA DAS PÉTALAS

        for (let i = 0; i < encontro.petalas; i++) {

            const angulo = i * 360 / encontro.petalas;

            petalasExternas += `
                <path
                    d="M 0 5
                       C -13 -5, -19 -28, -9 -42
                       C -3 -51, 7 -49, 13 -38
                       C 22 -20, 10 -3, 0 5 Z"
                    transform="rotate(${angulo})"
                    fill="url(#${id}-petala)"
                    stroke="${encontro.cor}"
                    stroke-width=".6"
                />
            `;
        }

        // CAMADA INTERNA DAS PÉTALAS

        for (let i = 0; i < encontro.petalas; i++) {

            const angulo =
                i * 360 / encontro.petalas + 20;

            petalasInternas += `
                <ellipse
                    cx="0"
                    cy="-17"
                    rx="8"
                    ry="20"
                    transform="rotate(${angulo})"
                    fill="url(#${id}-interna)"
                    opacity=".85"
                />
            `;
        }

        // PEQUENOS DETALHES DO MIOLO

        for (let i = 0; i < 20; i++) {

            const angulo = i * 2.39996;
            const raio = Math.sqrt(i) * 2.1;

            const x = Math.cos(angulo) * raio;
            const y = Math.sin(angulo) * raio;

            detalhesMiolo += `
                <circle
                    cx="${x}"
                    cy="${y}"
                    r="1.3"
                    fill="#8D6934"
                    opacity=".65"
                />
            `;
        }

        // DESENHO SVG DA FLOR

        flor.innerHTML = `
            <span class="jardim-ano-flor">
                ${encontro.ano}
            </span>

            <svg
                viewBox="0 0 110 ${altura}"
                preserveAspectRatio="xMidYMax meet"
                aria-hidden="true"
            >

                <defs>

                    <linearGradient
                        id="${id}-petala"
                        x1="0%" y1="0%"
                        x2="100%" y2="100%"
                    >
                        <stop
                            offset="0%"
                            stop-color="#ffffff"
                            stop-opacity=".85"
                        />

                        <stop
                            offset="40%"
                            stop-color="${encontro.cor}"
                        />

                        <stop
                            offset="100%"
                            stop-color="${encontro.cor}"
                            stop-opacity=".95"
                        />
                    </linearGradient>

                    <linearGradient
                        id="${id}-interna"
                        x1="0%" y1="0%"
                        x2="0%" y2="100%"
                    >
                        <stop
                            offset="0%"
                            stop-color="#ffffff"
                            stop-opacity=".75"
                        />

                        <stop
                            offset="100%"
                            stop-color="${encontro.cor}"
                        />
                    </linearGradient>

                    <linearGradient
                        id="${id}-caule"
                        x1="0%" y1="0%"
                        x2="100%" y2="0%"
                    >
                        <stop offset="0%" stop-color="#547D62"/>
                        <stop offset="50%" stop-color="#9FBC91"/>
                        <stop offset="100%" stop-color="#638C70"/>
                    </linearGradient>

                    <linearGradient
                        id="${id}-folha"
                        x1="0%" y1="0%"
                        x2="100%" y2="100%"
                    >
                        <stop offset="0%" stop-color="#C1D4A7"/>
                        <stop offset="50%" stop-color="#91B28A"/>
                        <stop offset="100%" stop-color="#648C70"/>
                    </linearGradient>

                    <radialGradient id="${id}-miolo">
                        <stop offset="0%" stop-color="#FFF1B5"/>
                        <stop offset="65%" stop-color="#D4AC67"/>
                        <stop offset="100%" stop-color="#A67B3B"/>
                    </radialGradient>

                </defs>

                <g class="jardim-corpo-flor">

                    <!-- CAULE -->

                    <path
                        d="M 55 ${altura}
                           Q ${55 + curva} ${altura * .55}
                           55 ${topo}"
                        fill="none"
                        stroke="url(#${id}-caule)"
                        stroke-width="4"
                        stroke-linecap="round"
                    />

                    <!-- FOLHA ESQUERDA -->

                    <path
                        d="M 54 ${altura * .72}
                           Q 9 ${altura * .65}
                           13 ${altura * .49}
                           Q 50 ${altura * .52}
                           54 ${altura * .72}"
                        fill="url(#${id}-folha)"
                    />

                    <path
                        d="M 54 ${altura * .72}
                           Q 29 ${altura * .62}
                           13 ${altura * .49}"
                        fill="none"
                        stroke="#648C70"
                        stroke-width=".8"
                    />

                    <!-- FOLHA DIREITA -->

                    <path
                        d="M 56 ${altura * .85}
                           Q 102 ${altura * .76}
                           98 ${altura * .63}
                           Q 61 ${altura * .67}
                           56 ${altura * .85}"
                        fill="url(#${id}-folha)"
                    />

                    <path
                        d="M 56 ${altura * .85}
                           Q 80 ${altura * .74}
                           98 ${altura * .63}"
                        fill="none"
                        stroke="#648C70"
                        stroke-width=".8"
                    />

                    <!-- CABEÇA DA FLOR -->

                    <g transform="translate(55 ${topo})">

                        <g class="jardim-cabeca">

                            <g class="jardim-petalas">

                                ${petalasExternas}

                                ${petalasInternas}

                                <circle
                                    r="13"
                                    fill="url(#${id}-miolo)"
                                />

                                ${detalhesMiolo}

                                <circle
                                    cx="-4"
                                    cy="-5"
                                    r="3"
                                    fill="#ffffff"
                                    opacity=".35"
                                />

                            </g>

                        </g>

                    </g>

                </g>

            </svg>
        `;

        flor.addEventListener("click", () => {
            selecionarFlor(indice);
        });

        return flor;
    }

    // ADICIONA AS 11 FLORES AO JARDIM

    encontros.forEach((encontro, indice) => {

        flores.appendChild(
            criarFlor(encontro, indice)
        );

    });

    // EXIBE AS INFORMAÇÕES DO ENCONTRO

    function selecionarFlor(indice) {

        const encontro = encontros[indice];

        document.querySelectorAll(".jardim-flor")
            .forEach((flor, posicao) => {

                const ativa = posicao === indice;

                flor.classList.toggle(
                    "jardim-ativa",
                    ativa
                );

                flor.setAttribute(
                    "aria-pressed",
                    String(ativa)
                );

            });

        document.querySelector(
            ".jardim-memoria-etiqueta"
        ).textContent = indice === 0
            ? "ONDE TUDO COMEÇOU"
            : `CAPÍTULO ${String(indice + 1).padStart(2, "0")}`;

        document.getElementById(
            "jardim-edicao"
        ).textContent = `${encontro.edicao} EJC GOIANA`;

        document.getElementById(
            "jardim-ano"
        ).textContent = encontro.ano;

        document.getElementById(
            "jardim-data"
        ).textContent = encontro.data;

        memoria.classList.remove("jardim-revelar");

        void memoria.offsetWidth;

        memoria.classList.add("jardim-revelar");
    }



// =========================================
// CRIAÇÃO DO GRAMADO NATURAL
// =========================================

const gramado = document.getElementById("jardim-gramado");

if (gramado) {

    const coresGrama = [
        "#A8BF9C",
        "#91AD86",
        "#B5CBA8",
        "#83A17D",
        "#C2D3B4"
    ];

    const quantidadeGrama =
        window.innerWidth <= 768 ? 90 : 200;

    for (let i = 0; i < quantidadeGrama; i++) {

        const grama = document.createElement("span");

        grama.className = "jardim-grama";

        grama.style.setProperty(
            "--grama-x",
            `${Math.random() * 100}%`
        );

        grama.style.setProperty(
            "--grama-y",
            `${Math.random() * 12}px`
        );

        grama.style.setProperty(
            "--grama-altura",
            `${6 + Math.random() * 24}px`
        );

        grama.style.setProperty(
            "--grama-largura",
            `${1.5 + Math.random() * 2.5}px`
        );

        grama.style.setProperty(
            "--grama-cor",
            coresGrama[
                Math.floor(Math.random() * coresGrama.length)
            ]
        );

        grama.style.setProperty(
            "--grama-opacidade",
            `${0.25 + Math.random() * 0.40}`
        );

        grama.style.setProperty(
            "--grama-tempo",
            `${2 + Math.random() * 3}s`
        );

        grama.style.setProperty(
            "--grama-atraso",
            `${Math.random() * -5}s`
        );

        gramado.appendChild(grama);

    }

}

    // PARTÍCULAS DOURADAS

    for (let i = 0; i < 25; i++) {

        const particula = document.createElement("span");

        particula.className = "jardim-particula";

        particula.style.setProperty(
            "--posicao",
            `${Math.random() * 100}%`
        );

        particula.style.setProperty(
            "--tamanho",
            `${1.5 + Math.random() * 3}px`
        );

        particula.style.setProperty(
            "--duracao",
            `${7 + Math.random() * 9}s`
        );

        particula.style.setProperty(
            "--atraso",
            `${Math.random() * -15}s`
        );

        particulas.appendChild(particula);
    }

    // INICIA O FLORESCIMENTO QUANDO
    // O VISITANTE CHEGA AO JARDIM

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    jardim.classList.toggle(
                        "jardim-na-tela",
                        entrada.isIntersecting
                    );

                    if (entrada.isIntersecting) {

                        jardim.classList.add(
                            "jardim-visivel"
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        observador.observe(
            document.querySelector(".jardim-cenario")
        );

    } else {

        jardim.classList.add(
            "jardim-visivel",
            "jardim-na-tela"
        );

    }

    // SELECIONA O PRIMEIRO ENCONTRO

    selecionarFlor(0);

});
