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
        let obj = JSON.parse(json); 
        return new Carta(obj.code, obj.value, obj.suit, obj.imagen);
    }

    createHtmlElement() {
        let divCarta = document.createElement("div");
        divCarta.className = "card border-secondary shadow-sm h-100";

        let img = document.createElement("img");
        img.src = this.imagen;
        img.className = "card-img-top"; 
        img.style.cursor = "pointer";
        
        img.addEventListener("click", () => {
            window.open(this.imagen, "_blank");
        });

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column align-items-center justify-content-center text-center";
        
        let titulo = document.createElement("h5");
        titulo.innerText = this.value + " de " + this.suit;
        titulo.className = "card-title text-dark text-capitalize"; 

        let parrafoCodigo = document.createElement("p");
        parrafoCodigo.innerText = "Código: " + this.code;
        parrafoCodigo.className = "card-text text-muted mb-3";

        let btnGuardar = document.createElement("button");
        btnGuardar.innerText = "Guardar";
        btnGuardar.className = "btn btn-outline-success mt-auto w-100"; 
        btnGuardar.addEventListener("click", () => {
            Carta.guardarCarta(this);
        });

        cardBody.appendChild(titulo);
        cardBody.appendChild(parrafoCodigo);
        cardBody.appendChild(btnGuardar);

        divCarta.appendChild(img);
        divCarta.appendChild(cardBody);

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
            localStorage.setItem("cartasGuardadas", JSON.stringify(guardadas));
            alert("Carta guardada correctamente!");
        } else {
            alert("Esta carta ya la habías guardado.");
        }
    }
}