class Carta {
    constructor(code, value, suit, imagen) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        let obj = json; 
        return new Carta(obj.code, obj.value, obj.suit, obj.imagen);
    }

    createHtmlElement() {
        let divCarta = document.createElement("div");
        divCarta.className = "tarjeta";

        let img = document.createElement("img");
        img.src = this.imagen;
        img.style.width = "100%"; 
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            window.open(this.imagen, "_blank");
        });

        let titulo = document.createElement("h3");
        titulo.innerText = this.value + " of " + this.suit;

        let parrafoCodigo = document.createElement("p");
        parrafoCodigo.innerText = "Código: " + this.code;

        let btnGuardar = document.createElement("button");
        btnGuardar.innerText = "Guardar";
        btnGuardar.className = "btn btn-outline-primary"; 
        btnGuardar.addEventListener("click", () => {
            Carta.guardarCarta(this);
        });

        divCarta.appendChild(img);
        divCarta.appendChild(titulo);
        divCarta.appendChild(parrafoCodigo);
        divCarta.appendChild(btnGuardar);

        return divCarta;
    }

    static guardarCarta(carta) {
        let guardadas = localStorage.getItem("cartasGuardadas");
        if(guardadas == null) {
            guardadas = [];
        } else {
            guardadas = JSON.parse(guardadas);
        }

        let repetida = false;
        for(let i = 0; i < guardadas.length; i++) {
            if(guardadas[i].code === carta.code) {
                repetida = true;
            }
        }

        if(!repetida) {
            guardadas.push(carta);
            
            localStorage.setItem("cartasGuardadas", guardadas);
            alert("Carta guardada correctamente!");
        } else {
            alert("Esta carta ya la habías guardado.");
        }
    }
}