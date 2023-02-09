class Autoservis {
    constructor(nazev, list) {
        this.nazev = nazev;
        this.list = list; 
    }

    addAuto(a) {
        list.push(a);
    }

    removeAuto(index){
        list.pop(index);
    }

    vsechnyAuta() {
        list.forEach( auto => {
            vypis.textContent += "Auto: " +auto.znacka+ " " +auto.model+ ", rok vyroby: " +auto.rokVyroby+ ", najete km: " +auto.najeteKm;;
        })
    }
}

class Auto {
    constructor(znacka, model, rokVyroby, najeteKm) {
        this.znacka = znacka;
        this.model = model;
        this.rokVyroby = rokVyroby;
        this.najeteKm = najeteKm;
    }
}

const list = [];
let autoServis = new Autoservis("autoservis", list);

const vypis = document.querySelector(".vypis");

let keyAut = "auta";
loadlocalStorageObrazu(keyAut);

const addCar = (ev) => {
    if(document.getElementById("znacka").value !== "" &&
    document.getElementById("model").value !== "" &&
    String(document.getElementById("datVyr").value) !== "" &&
    document.getElementById("najeteKm").value !== ""
    ) {
        ev.preventDefault()
        let a = new Auto(document.getElementById("znacka").value,
        document.getElementById("model").value,
        String(document.getElementById("datVyr").value),
        document.getElementById("najeteKm").value
        );
        autoServis.addAuto(a);
        console.log("auto pridano!");
        localStorage.setItem(keyAut, JSON.stringify(autoServis.list));
        document.querySelector(".AutoForm").reset();
    }
}
const buttonSubmitAuto = document.getElementById("submitAuto");
buttonSubmitAuto.addEventListener("click", addCar);

const buttonAllCars = document.getElementById("allCars");
buttonAllCars.addEventListener("click", () => {
    vypis.textContent = "Vsechny auta v autoservisu " +autoServis.nazev+ ": ";
    autoServis.vsechnyAuta();
});

const buttonClear = document.getElementById("clear");
buttonClear.addEventListener("click", () => {
    localStorage.clear();
    autoServis.list.length = 0;
    vypis.textContent = "";
})

const indexRemove = document.getElementById("index");
const buttonRemoveCar = document.getElementById("removeCar");
buttonRemoveCar.addEventListener("click", () => {
    if(autoServis.list.length > 0) {
        let index = indexRemove.value;
        autoServis.removeAuto(index);
        localStorage.setItem(keyAut, JSON.stringify(autoServis.list));
    }
})

function loadlocalStorageObrazu(keyAut){
    if(localStorage.getItem(keyAut) !== null){
        let tmp = JSON.parse(localStorage.getItem(keyAut));
        for(let i = 0; i < tmp.length; i++){
            autoServis.addAuto(tmp[i]);
        }
    }
}

