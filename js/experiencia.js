
// ==========================================
// EJC GOIANA - CARTAS INTERATIVAS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const cartas = document.querySelectorAll(
        ".experiencia-carta"
    );

    cartas.forEach((carta) => {

        carta.addEventListener("click", () => {

            const virada = carta.classList.toggle("virada");

            carta.setAttribute(
                "aria-pressed",
                String(virada)
            );

            carta.setAttribute(
                "aria-label",
                virada
                    ? "Ocultar mensagem"
                    : "Revelar uma mensagem"
            );

        });

    });

});
