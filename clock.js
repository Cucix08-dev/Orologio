//VARS
const clocks = ["Digital", "Analog", "Roman", "Math", "Programmer"];
let clockSelectedIndex = 0;
let rect;

// CONTAINERS
const analogClockContainer = document.getElementById("analog-clock");
analogClockContainer.classList.add("hidden");

const miniArrowsContainer = document.getElementById("mini-arrows-container")

const clockArrows = document.querySelectorAll(".arrow-clock");

const digitalClockContainer = document.getElementById("digital-clock");
const timeContainer = document.getElementById("time-standard"); //ONLY FOR DIGITAL CLOCK

const clockSelectedContainer = document.getElementById("clock-selected");
clockSelectedContainer.textContent = clocks[clockSelectedIndex];

const body = document.body;

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

function generateMiniArrows() {

    miniArrowsContainer.innerHTML = "";

    const w = analogClockContainer.offsetWidth;
    const h = analogClockContainer.offsetHeight;

    if (w === 0 || h === 0) {
        requestAnimationFrame(generateMiniArrows);
        return;
    }

    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(centerX, centerY) - 10;

    let xs = [];
    let ys = [];

    // --- PRIMA PASSATA: calcolo tutte le X e Y delle ORE ---
    for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg - 90) * Math.PI / 180;

        const x = centerX + Math.cos(rad) * radius;
        const y = centerY + Math.sin(rad) * radius;

        xs.push(x);
        ys.push(y);
    }

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);

    const offsetX = analogClockContainer.offsetLeft - minX;
    const offsetY = analogClockContainer.offsetTop - minY;

    // --- SECONDA PASSATA: ORE ---
    for (let deg = 0; deg < 360; deg += 30) {

        const el = document.createElement("div");
        el.classList.add("hours-arrows-mini", "arrows-mini");

        const rad = (deg - 90) * Math.PI / 180;

        const x = centerX + Math.cos(rad) * radius;
        const y = centerY + Math.sin(rad) * radius;

        const finalX = x + offsetX;
        const finalY = y + offsetY;

        el.style.left = finalX + 2.5 + "px";
        el.style.top = finalY + 5 + "px";
        el.style.transform = `rotate(${deg}deg)`;

        miniArrowsContainer.appendChild(el);
    }

    for (let deg = 0; deg < 360; deg += 6) {

        if (deg % 30 === 0) continue;

        const el = document.createElement("div");
        el.classList.add("minutes-arrows-mini", "arrows-mini");

        const rad = (deg - 90) * Math.PI / 180;

        const x = centerX + Math.cos(rad) * radius;
        const y = centerY + Math.sin(rad) * radius;

        const finalX = x + offsetX;
        const finalY = y + offsetY;

        el.style.left = finalX + 7.5 + "px";
        el.style.top = finalY + 4 + "px";
        el.style.transform = `rotate(${deg}deg)`;

        miniArrowsContainer.appendChild(el);
    }
}



//SELECTION CLOCKS
function controlCase(){
    let font = clocks[clockSelectedIndex].toLowerCase();

    if (clocks[clockSelectedIndex].toLowerCase() == "digital") {
        analogClockContainer.classList.add("hidden");
        digitalClockContainer.classList.remove("hidden");
    }
    else {
        timeContainer.textContent = "";
        analogClockContainer.classList.remove("hidden");
        digitalClockContainer.classList.add("hidden");
    }


    body.style.fontFamily = (
        font.toLowerCase()=="math")?
        "mathFont":
        font.toLowerCase();
}

leftArrow.addEventListener("click", () => {
    if (clockSelectedIndex-1<0) {
        clockSelectedIndex = clocks.length-1;
        clockSelectedContainer.textContent = clocks[clockSelectedIndex];
    }
    else{
        clockSelectedContainer.textContent = clocks[--clockSelectedIndex];
    }

    controlCase();
    
});

rightArrow.addEventListener("click", () => {
    if (clockSelectedIndex+1>clocks.length-1) {
        clockSelectedIndex = 0;
        clockSelectedContainer.textContent = clocks[clockSelectedIndex];
    }
    else{
        clockSelectedContainer.textContent = clocks[++clockSelectedIndex];
    }
    
    controlCase();
    
});


//TIME UPDATE
setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    let timeARR = [hours,minutes,seconds];
    for (let index = 0; index < timeARR.length; index++) {
        if (timeARR[index] >= 0 && timeARR[index] <= 9) {
            timeARR[index] = "0" + timeARR[index]
        }
    }

    if (clocks[clockSelectedIndex].toLowerCase() == "digital") {
        timeContainer.textContent = timeARR[0] + " : " + timeARR[1] + " : " + timeARR[2];
    }
    else{
        timeContainer.textContent = ""
    }

    const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90;
    const minAngle = (minutes + seconds / 60) * 6 - 90;
    const secAngle = seconds * 6 - 90;

    clockArrows.forEach(el => {
        if (el.id === "hou-arrow") {
            el.style.transform = `rotate(${hourAngle}deg)`
        }
        else if (el.id === "min-arrow") {
            el.style.transform = `rotate(${minAngle}deg)`
        }
        else if (el.id === "sec-arrow") {
            el.style.transform = `rotate(${secAngle}deg)`
        }
    });

    generateMiniArrows()
}, 1000);
