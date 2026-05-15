let pagina = 1;

document.addEventListener("DOMContentLoaded", () => {
    cargarCartas();

    let btnSig = document.getElementById("siguiente");
    let btnAnt = document.getElementById("anterior");

    btnSig.addEventListener("click", paginaSiguiente);
    btnAnt.addEventListener("click", paginaAnterior);
});

async function cargarCartas() {
    try {
        let respuesta = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=6");
        let datos = await respuesta.json();
        let contenedor = document.getElementById("cartas");
        contenedor.innerHTML = ""; 

        for (let i = 0; i < datos.cards.length; i++) {
            let c = datos.cards[i];
            let nuevaCarta = new Carta(c.code, c.value, c.suit, c.image);
            contenedor.appendChild(nuevaCarta.createHtmlElement());
        }

        if(pagina === 1) {
            document.getElementById("anterior").disabled = true;
        } else {
            document.getElementById("anterior").disabled = false;
        }

    } catch (error) {
        console.log("Hubo un error al traer las cartas: " + error);
    }
}

function paginaSiguiente() {
    pagina++;
    cargarCartas();
}

function paginaAnterior() {
    if (pagina > 1) {
        pagina--;
        cargarCartas();
    }
}