document.addEventListener("DOMContentLoaded", () => {
    mostrarGuardados();

    document.getElementById("ordenarValor").addEventListener("click", ordenarPorValor);
    document.getElementById("ordenarPalo").addEventListener("click", ordenarPorPalo);
});

function mostrarGuardados(arrayCartas = null) {
    let contenedor = document.getElementById("cartas");
    contenedor.innerHTML = "";

    let guardadas = arrayCartas;
    
    if (guardadas == null) {
        let storage = localStorage.getItem("cartasGuardadas");
        if (storage != null) {
            guardadas = JSON.parse(storage);
        } else {
            guardadas = [];
        }
    }

    if (guardadas.length === 0) {
        contenedor.innerHTML = "<h5 class='text-center w-100 mt-4'>No hay cartas guardadas en tu colección.</h5>";
        return;
    }

    for (let i = 0; i < guardadas.length; i++) {
        let c = guardadas[i];
        let cartaObj = new Carta(c.code, c.value, c.suit, c.imagen);
        let elemento = cartaObj.createHtmlElement();
        
        let btn = elemento.querySelector("button");
        if (btn) {
            btn.remove(); 
        }

        contenedor.appendChild(elemento);
    }
}

function obtenerValorNumerico(valorStr) {
    if (valorStr === "ACE") return 14;
    if (valorStr === "KING") return 13;
    if (valorStr === "QUEEN") return 12;
    if (valorStr === "JACK") return 11;
    return parseInt(valorStr); 
}

function obtenerValorPalo(paloStr) {
    if (paloStr === "SPADES") return 1;
    if (paloStr === "CLUBS") return 2;
    if (paloStr === "HEARTS") return 3;
    if (paloStr === "DIAMONDS") return 4;
    return 5;
}

function ordenarPorValor() {
    let storage = localStorage.getItem("cartasGuardadas");
    if (storage != null) {
        let guardadas = JSON.parse(storage);
        guardadas.sort((a, b) => obtenerValorNumerico(a.value) - obtenerValorNumerico(b.value));
        mostrarGuardados(guardadas);
    }
}

function ordenarPorPalo() {
    let storage = localStorage.getItem("cartasGuardadas");
    if (storage != null) {
        let guardadas = JSON.parse(storage);
        guardadas.sort((a, b) => obtenerValorPalo(a.suit) - obtenerValorPalo(b.suit));
        mostrarGuardados(guardadas);
    }
}