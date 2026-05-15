document.addEventListener("DOMContentLoaded", () => {
    cargarCartas();
});

async function cargarCartas() {
    try {
        let respuesta = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=6");
        let datos = await respuesta.json();

        let contenedor = document.getElementById("cartas");

        for (let i = 0; i < datos.cards.length; i++) {
            let c = datos.cards[i];
            let nuevaCarta = new Carta(c.code, c.value, c.suit, c.image);
            
            contenedor.appendChild(nuevaCarta.createHtmlElement());
        }

    } catch (error) {
        console.log("Hubo un error al traer las cartas: " + error);
    }
}