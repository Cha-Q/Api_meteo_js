const submit = document.querySelector("#submit");
const display = document.querySelector("#display");

function buildUrl(str) {
    const url = "https://www.prevision-meteo.ch/services/json/";
    return `${url}${str}`;
}

async function requestApi(url) {
    let response = await fetch(url);
    let data = await response.json();

    doSomething(data);
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const field = document.querySelector("#cityField");
    const url = buildUrl(field.value);

    display.innerHTML = " ";
    requestApi(url);
});

function doSomething(data) {

    const tab = [];
    let {
        date,
        hour,
        tmp,
        condition,
        icon_big
    } = data.current_condition;

    let { day_long } = data['fcst_day_0'];
    let divJourJ = document.createElement('div');
    let jourJ = document.createElement("h2");
    let dateJ = document.createElement("h4");
    let heureJ = document.createElement("p");
    let conditionJ = document.createElement("p");
    let tempJ = document.createElement("p");
    let iconJ = document.createElement("img");

    let evoDay = document.createElement("h2");


    jourJ.textContent = `${day_long}`;
    dateJ.textContent = `${date}`;
    heureJ.textContent = `${hour}`;
    conditionJ.textContent = `Conditions durant la journée : ${condition}`;
    tempJ.textContent = `Température maximale : ${tmp}`;
    iconJ.setAttribute("src", icon_big);
    evoDay.textContent = "Evolution de la journée heure par heure :";

    display.appendChild(divJourJ);
    divJourJ.setAttribute("id", "idJourJ");
    divJourJ.appendChild(jourJ);
    divJourJ.appendChild(dateJ);
    divJourJ.appendChild(heureJ);
    divJourJ.appendChild(iconJ);
    divJourJ.appendChild(conditionJ);
    divJourJ.appendChild(tempJ);
    divJourJ.appendChild(evoDay);

    for (let i = 0; i <= 23; i++) {
        const line = document.createElement("p");
        const heure = document.createElement("span");
        heure.textContent = `${i}h00`;

        line.appendChild(heure);
        const imgH = document.createElement("img");
        imgH.setAttribute('src', `${data.fcst_day_0.hourly_data[`${ i }H00`].ICON}`);
        line.appendChild(imgH);
        const conditonsH = document.createElement("span");
        conditonsH.textContent = `${data.fcst_day_0.hourly_data[`${i}H00`].CONDITION_KEY}`;
        line.appendChild(conditonsH);
        display.appendChild(line);
    }


    for (let str of Object.keys(data)) {
        if (str.includes("fcst_day")) {
            tab.push(data[str]);
        }
    }
    tab.shift();
    console.log(tab);


    for (let element of tab) {
        let j = 1;
        let {
            day_long,
            date,
            tmax,
            tmin,
            condition,
            icon_big
        } = element;

        let jourP = document.createElement("h2");
        let dateP = document.createElement("h4");
        let iconP = document.createElement("img");
        let conditionP = document.createElement("p");
        let tminP = document.createElement("p");
        let tmaxP = document.createElement("p");

        jourP.textContent = `${day_long}`;
        dateP.textContent = `${date}`;
        conditionP.textContent = `${condition}`;
        tminP.textContent = `Température minimale : ${tmin}, Température maximale : ${tmax}`;
        // tmaxP.textContent = ``;
        iconP.setAttribute("src", icon_big);

        display.appendChild(jourP);
        display.appendChild(dateP);
        display.appendChild(iconP);
        display.appendChild(conditionP);
        display.appendChild(tminP);
        display.appendChild(tmaxP);
        
        
        

            for (let i = 0; i <= 23; i++) {
                
                    const line = document.createElement("p");
                    const heure = document.createElement("span");
                    heure.textContent = `${i}h00`;
                    line.appendChild(heure);
                    const imgH = document.createElement("img");
                    imgH.setAttribute('src', `${element.hourly_data[`${i}H00`].ICON}`);
                    line.appendChild(imgH);
                    const conditonsH = document.createElement("span");
                    conditonsH.textContent = `${element.hourly_data[`${i}H00`].CONDITION_KEY}`;
                    line.appendChild(conditonsH);
                    display.appendChild(line);
                }
            
        
        
        j++;
        
        
    }
};


var now = new Date();

var heure   = now.getHours();

console.log(heure);
let enTete = document.querySelector("header");
function headBackground() {
    if(heure < 7){
        enTete.style.backgroundImage = "url('./images/nuit_matin.jpg')";
        enTete.style.backgroundSize =  "cover";
    } else if (heure < 10){
        enTete.style.backgroundImage = "url('./images/lever_de_soleil.jpg')";
        enTete.style.backgroundSize =  "cover";
    } else if (heure < 18){
        enTete.style.backgroundImage = "url('./images/jour.jpg')";
        enTete.style.backgroundSize =  "cover";
    } else if (heure < 21){
        enTete.style.backgroundImage = "url('./images/coucher-soleil-19avril16-316-scaled.jpg')";
        enTete.style.backgroundSize =  "cover";
    } else if (heure < 2){
        enTete.style.backgroundImage = "url('./images/nuit.jpg')";
        enTete.style.backgroundSize =  "cover";
    }
}

headBackground();