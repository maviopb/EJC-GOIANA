
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js";

// ==========================================
// EJC GOIANA - SANTÍSSIMO PREMIUM 2.0
// MODELO 3D COM ROTAÇÃO 360°
// ==========================================

const container = document.getElementById("santissimo3d");
const botaoReset = document.getElementById("resetSantissimo");
const avisoErro = document.getElementById("santissimo-erro");

if (container) {
    try {
        iniciarSantissimo();
    } catch (erro) {
        console.error("Erro ao criar Santíssimo:", erro);

        if (avisoErro) {
            avisoErro.hidden = false;
        }
    }
}

function iniciarSantissimo() {

    // ======================================
    // 1. CENA E CÂMERA
    // ======================================

    const cena = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        35,
        1,
        0.1,
        100
    );

    // Enquadramento do Santíssimo
    // Um pouco mais distante para mostrar todos os raios

    camera.position.set(0, 0.35, 12.5);
    camera.lookAt(0, 0.15, 0);
    
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // ======================================
    // 2. MATERIAIS PREMIUM
    // ======================================

    const ouro = new THREE.MeshPhysicalMaterial({
        color: 0xffc34b,
        metalness: 0.95,
        roughness: 0.19,
        clearcoat: 0.25,
        clearcoatRoughness: 0.15
    });

    const ouroClaro = new THREE.MeshPhysicalMaterial({
        color: 0xffdf8a,
        metalness: 0.92,
        roughness: 0.15,
        clearcoat: 0.3,
        clearcoatRoughness: 0.12
    });

    const ouroEscuro = new THREE.MeshPhysicalMaterial({
        color: 0x996018,
        metalness: 0.9,
        roughness: 0.28,
        clearcoat: 0.15
    });

    const ouroBrilhante = new THREE.MeshPhysicalMaterial({
        color: 0xffe6a1,
        metalness: 0.95,
        roughness: 0.12,
        clearcoat: 0.4,
        clearcoatRoughness: 0.08
    });

    const rubi = new THREE.MeshPhysicalMaterial({
        color: 0xb50020,
        metalness: 0.08,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.06
    });

    const rubiClaro = new THREE.MeshStandardMaterial({
        color: 0xff3552,
        metalness: 0.1,
        roughness: 0.15
    });

    const hostia = new THREE.MeshStandardMaterial({
        color: 0xfffdf4,
        metalness: 0,
        roughness: 0.78,
        side: THREE.DoubleSide
    });

    // ======================================
    // 3. GRUPO DO SANTÍSSIMO
    // ======================================

    const santissimo = new THREE.Group();
    cena.add(santissimo);

    const corpo = new THREE.Group();
    santissimo.add(corpo);

    const centroY = 1.25;

    // ======================================
    // 4. FUNÇÕES AUXILIARES
    // ======================================

    function adicionar(geometria, material, x, y, z) {

        const objeto = new THREE.Mesh(
            geometria,
            material
        );

        objeto.position.set(x, y, z);
        corpo.add(objeto);

        return objeto;
    }

    function cilindro(
        raioCima,
        raioBaixo,
        altura,
        material,
        x,
        y,
        z,
        segmentos = 64
    ) {

        return adicionar(
            new THREE.CylinderGeometry(
                raioCima,
                raioBaixo,
                altura,
                segmentos
            ),
            material,
            x,
            y,
            z
        );
    }

    function esfera(raio, material, x, y, z) {

        return adicionar(
            new THREE.SphereGeometry(
                raio,
                20,
                16
            ),
            material,
            x,
            y,
            z
        );
    }

    function toro(
        raio,
        espessura,
        material,
        x,
        y,
        z
    ) {

        return adicionar(
            new THREE.TorusGeometry(
                raio,
                espessura,
                12,
                96
            ),
            material,
            x,
            y,
            z
        );
    }

    function tubo(pontos, raio, material) {

        const curva = new THREE.CatmullRomCurve3(
            pontos.map(
                p => new THREE.Vector3(...p)
            )
        );

        return adicionar(
            new THREE.TubeGeometry(
                curva,
                36,
                raio,
                8,
                false
            ),
            material,
            0,
            0,
            0
        );
    }

    // ======================================
    // 5. ESTRUTURA CIRCULAR CENTRAL
    // ======================================

    const centro = cilindro(
        1.06,
        1.06,
        0.24,
        ouroEscuro,
        0,
        centroY,
        0
    );

    centro.rotation.x = Math.PI / 2;

    // Hóstia frontal
    adicionar(
        new THREE.CircleGeometry(0.78, 96),
        hostia,
        0,
        centroY,
        0.135
    );

    // Hóstia traseira
    const verso = adicionar(
        new THREE.CircleGeometry(0.78, 96),
        hostia,
        0,
        centroY,
        -0.135
    );

    verso.rotation.y = Math.PI;

    // Molduras circulares em relevo
    const molduras = [
        [0.81, 0.045, ouroClaro],
        [0.89, 0.045, ouro],
        [0.99, 0.07, ouroBrilhante],
        [1.09, 0.06, ouroEscuro],
        [1.19, 0.075, ouro],
        [1.28, 0.04, ouroClaro]
    ];

    molduras.forEach(([raio, espessura, material]) => {

        toro(
            raio,
            espessura,
            material,
            0,
            centroY,
            0.16
        );

        toro(
            raio,
            espessura,
            material,
            0,
            centroY,
            -0.16
        );
    });

    // ======================================
    // 6. RAIOS VAZADOS ORNAMENTADOS
    // ======================================

    function criarRaio(angulo, comprimento, largura) {

        const inicio = 1.22;
        const fim = inicio + comprimento;

        const forma = new THREE.Shape();

        forma.moveTo(-largura * 0.43, inicio);
        forma.lineTo(-largura * 0.55, fim * 0.80);
        forma.lineTo(-largura * 0.19, fim * 0.93);
        forma.lineTo(0, fim);
        forma.lineTo(largura * 0.19, fim * 0.93);
        forma.lineTo(largura * 0.55, fim * 0.80);
        forma.lineTo(largura * 0.43, inicio);
        forma.closePath();

        // Abertura interna
        const buraco = new THREE.Path();

        buraco.moveTo(-largura * 0.22, inicio + 0.13);
        buraco.lineTo(largura * 0.22, inicio + 0.13);
        buraco.lineTo(largura * 0.27, fim * 0.78);
        buraco.lineTo(0, fim - 0.24);
        buraco.lineTo(-largura * 0.27, fim * 0.78);
        buraco.closePath();

        forma.holes.push(buraco);

        const geometria = new THREE.ExtrudeGeometry(
            forma,
            {
                depth: 0.13,
                steps: 1,
                bevelEnabled: true,
                bevelThickness: 0.018,
                bevelSize: 0.018,
                bevelSegments: 2,
                curveSegments: 8
            }
        );

        const raio = new THREE.Mesh(
            geometria,
            [ouroClaro, ouro]
        );

        raio.position.set(0, centroY, -0.065);
        raio.rotation.z = -angulo;

        corpo.add(raio);

        // Filete ornamental
        const filete = new THREE.Group();

        const curva = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, inicio + 0.06, 0.12),
            new THREE.Vector3(0, inicio + 0.16, 0.12),
            new THREE.Vector3(0, inicio + 0.24, 0.12)
        ]);

        const detalhe = new THREE.Mesh(
            new THREE.TubeGeometry(
                curva,
                12,
                0.018,
                6,
                false
            ),
            ouroBrilhante
        );

        filete.add(detalhe);
        filete.position.y = centroY;
        filete.rotation.z = -angulo;

        corpo.add(filete);
    }


    const quantidadeRaios = 24;

    for (let i = 0; i < quantidadeRaios; i++) {

        const angulo =
            (i / quantidadeRaios) * Math.PI * 2;

        const longo = i % 2 === 0;

        criarRaio(
            angulo,
            longo ? 1.50 : 1.08,
            longo ? 0.43 : 0.32
        );
    }


    // ======================================
    // 7. PEDRARIAS VERMELHAS
    // ======================================

    const quantidadePedras = 16;

    for (let i = 0; i < quantidadePedras; i++) {

        const angulo =
            (i / quantidadePedras) * Math.PI * 2;

        const raio = 1.14;

        const x = Math.sin(angulo) * raio;
        const y = centroY + Math.cos(angulo) * raio;

        esfera(0.082, ouroEscuro, x, y, 0.18);
        esfera(0.064, rubi, x, y, 0.235);

        esfera(
            0.019,
            rubiClaro,
            x - 0.018,
            y + 0.018,
            0.289
        );

        // Pedras no verso
        esfera(0.065, rubi, x, y, -0.22);
    }

    // ======================================
    // 8. RELEVOS CIRCULARES
    // ======================================

    for (let i = 0; i < 96; i++) {

        const angulo = (i / 96) * Math.PI * 2;

        const x = Math.cos(angulo) * 0.95;
        const y = centroY + Math.sin(angulo) * 0.95;

        esfera(
            0.015,
            ouroBrilhante,
            x,
            y,
            0.215
        );
    }

    // ======================================
    // 9. HASTE ESCULPIDA
    // ======================================

    const pontosHaste = [
        [0.0, -2.18],
        [0.17, -2.18],
        [0.20, -2.05],
        [0.15, -1.90],
        [0.13, -1.65],
        [0.16, -1.40],
        [0.12, -1.15],
        [0.13, -0.90],
        [0.18, -0.60],
        [0.16, -0.30],
        [0.11, -0.08],
        [0.11, 0.12],
        [0.0, 0.12]
    ];

    const perfilHaste = pontosHaste.map(
        ([raio, altura]) =>
            new THREE.Vector2(raio, altura)
    );

    adicionar(
        new THREE.LatheGeometry(perfilHaste, 64),
        ouro,
        0,
        0,
        0
    );

    // Anéis ornamentais
    const alturasAneis = [
        -1.9,
        -1.6,
        -1.3,
        -1.0,
        -0.7,
        -0.4
    ];

    alturasAneis.forEach(y => {

        cilindro(
            0.205,
            0.205,
            0.055,
            ouroClaro,
            0,
            y,
            0
        );
    });

    // Relevos curvos da haste
    for (const lado of [-1, 1]) {

        tubo([
            [lado * 0.09, -1.85, 0.13],
            [lado * 0.22, -1.5, 0.12],
            [lado * 0.13, -1.12, 0.13],
            [lado * 0.23, -0.7, 0.12],
            [lado * 0.10, -0.35, 0.13]
        ], 0.026, ouroBrilhante);
    }

    // ======================================
    // 10. BASE ORNAMENTADA
    // ======================================

    const perfilBase = [
        [0.0, -2.12],
        [0.28, -2.12],
        [0.36, -2.23],
        [0.48, -2.34],
        [0.64, -2.40],
        [0.78, -2.45],
        [0.87, -2.53],
        [0.92, -2.63],
        [0.91, -2.71],
        [0.78, -2.76],
        [0.0, -2.76]
    ];

    const geometriaBase = new THREE.LatheGeometry(
        perfilBase.map(
            p => new THREE.Vector2(p[0], p[1])
        ),
        96
    );

    adicionar(
        geometriaBase,
        ouro,
        0,
        0,
        0
    );

    // Faixas decorativas
    cilindro(
        0.85,
        0.85,
        0.045,
        ouroClaro,
        0,
        -2.60,
        0
    );

    cilindro(
        0.92,
        0.92,
        0.045,
        ouroEscuro,
        0,
        -2.72,
        0
    );

    // Ornamentos da base
    for (let i = 0; i < 20; i++) {

        const angulo = (i / 20) * Math.PI * 2;

        const x = Math.cos(angulo) * 0.72;
        const z = Math.sin(angulo) * 0.72;

        esfera(
            0.095,
            ouroClaro,
            x,
            -2.46,
            z
        );

        esfera(
            0.04,
            ouroBrilhante,
            x * 1.06,
            -2.54,
            z * 1.06
        );
    }

    // ======================================
    // 11. ILUMINAÇÃO
    // ======================================

    const ambiente = new THREE.HemisphereLight(
        0xffffff,
        0x6e4b24,
        2.4
    );

    cena.add(ambiente);

    const luzPrincipal = new THREE.DirectionalLight(
        0xffe6b6,
        4.2
    );

    luzPrincipal.position.set(-4, 6, 8);
    cena.add(luzPrincipal);

    const luzDireita = new THREE.DirectionalLight(
        0xffffff,
        3.2
    );

    luzDireita.position.set(5, 2, 5);
    cena.add(luzDireita);

    const luzTraseira = new THREE.DirectionalLight(
        0xffb94d,
        4
    );

    luzTraseira.position.set(1, 4, -6);
    cena.add(luzTraseira);

    const luzAzul = new THREE.DirectionalLight(
        0x8fbaff,
        1.5
    );

    luzAzul.position.set(-5, 1, -3);
    cena.add(luzAzul);

    // ======================================
    // 12. ROTAÇÃO INTERATIVA 360°
    // ======================================

    const canvas = renderer.domElement;

    let arrastando = false;
    let ultimoX = 0;
    let ultimoY = 0;

    let alvoX = 0;
    let alvoY = 0;

    let rotacaoX = 0;
    let rotacaoY = 0;

    canvas.addEventListener("pointerdown", evento => {

        arrastando = true;

        ultimoX = evento.clientX;
        ultimoY = evento.clientY;

        canvas.setPointerCapture(evento.pointerId);
    });

    canvas.addEventListener("pointermove", evento => {

        if (!arrastando) return;

        const dx = evento.clientX - ultimoX;
        const dy = evento.clientY - ultimoY;

        alvoY += dx * 0.009;
        alvoX += dy * 0.006;

        alvoX = THREE.MathUtils.clamp(
            alvoX,
            -1.1,
            1.1
        );

        ultimoX = evento.clientX;
        ultimoY = evento.clientY;
    });

    function pararArraste() {
        arrastando = false;
    }

    canvas.addEventListener("pointerup", pararArraste);
    canvas.addEventListener("pointercancel", pararArraste);
    canvas.addEventListener("lostpointercapture", pararArraste);

    // ======================================
    // 13. BOTÃO DE RESET
    // ======================================

    if (botaoReset) {

        botaoReset.addEventListener("click", () => {

            alvoX = 0;
            alvoY = 0;
        });
    }

    // ======================================
    // 14. RESPONSIVIDADE
    // ======================================

    function redimensionar() {

        const largura = container.clientWidth;
        const altura = container.clientHeight;

        if (!largura || !altura) return;

        camera.aspect = largura / altura;
        camera.updateProjectionMatrix();

        renderer.setSize(
            largura,
            altura,
            false
        );
    }

    const observadorTamanho = new ResizeObserver(
        redimensionar
    );

    observadorTamanho.observe(container);
    redimensionar();

    // ======================================
    // 15. FLUTUAÇÃO E ANIMAÇÃO
    // ======================================

    const relogio = new THREE.Clock();

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let visivel = true;

    const observadorVisibilidade = new IntersectionObserver(
        entradas => {

            visivel = entradas[0].isIntersecting;

        },
        { threshold: 0.01 }
    );

    observadorVisibilidade.observe(container);

    function animar() {

        requestAnimationFrame(animar);

        if (!visivel) return;

        const tempo = relogio.getElapsedTime();

        rotacaoX = THREE.MathUtils.lerp(
            rotacaoX,
            alvoX,
            0.09
        );

        rotacaoY = THREE.MathUtils.lerp(
            rotacaoY,
            alvoY,
            0.09
        );

        santissimo.rotation.x = rotacaoX;
        santissimo.rotation.y = rotacaoY;

        if (!movimentoReduzido) {

            santissimo.position.y =
                Math.sin(tempo * 0.85) * 0.09;

        } else {

            santissimo.position.y = 0;
        }

        renderer.render(cena, camera);
    }

    animar();
}
