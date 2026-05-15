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
        divCarta.className = "tajeta"; 

        let img = document.createElement("img");
        img.src = this.imagen;
        img.style.width = "100%"; 

        let titulo = document.createElement("h3");
        titulo.innerText = this.value + " of " + this.suit;

        let parrafoCodigo = document.createElement("p");
        parrafoCodigo.innerText = "Codigo: " + this.code;

        divCarta.appendChild(img);
        divCarta.appendChild(titulo);
        divCarta.appendChild(parrafoCodigo);

        return divCarta;
    }
}