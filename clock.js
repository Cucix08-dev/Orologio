//VARS
const mathHours = [
    "Γ(2)",            // 1
    "⌊e⌋",             // 2
    "⌊π⌋",        // 3
    "2²",              // 4
    "⌈φ³⌉",            // 5
    "3!",              // 6
    "⌈π⌉ + 4",         // 7
    "2³",              // 8
    "3! + 3",          // 9
    "⌊π²⌋ + 1",        // 10
    "(3!)² - 25",      // 11
    "3·4"              // 12
];

const romanHours = [
    "I",            // 1
    "II",             // 2
    "III",        // 3
    "IV",              // 4
    "V",            // 5
    "VI",              // 6
    "VII",         // 7
    "VIII",              // 8
    "IX",          // 9
    "X",        // 10
    "XI",      // 11
    "XII"              // 12
];

const clocks = ["Digital", "Analog", "Roman", "Math", "Programmer"];
let clockSelectedIndex = 0;
let rect;

// CONTAINERS
const analogClockContainer = document.getElementById("analog-clock");
analogClockContainer.classList.add("hidden");

const miniArrowsContainer = document.getElementById("mini-arrows-container")

const hoursNumbersContainer = document.getElementById("hours-numbers");

const clockArrows = document.querySelectorAll(".arrow-clock");

const digitalClockContainer = document.getElementById("digital-clock");
const timeContainer = document.getElementById("time-standard"); //ONLY FOR DIGITAL CLOCK

const clockSelectedContainer = document.getElementById("clock-selected");
clockSelectedContainer.textContent = clocks[clockSelectedIndex];

const body = document.body;
body.style.fontFamily = 'digital';

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let font;

function computeClockGeometry() {

    const w = analogClockContainer.offsetWidth;
    const h = analogClockContainer.offsetHeight;

    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Prima passata: calcolo X/Y delle ore
    let xs = [];
    let ys = [];

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

    return {
        w, h,
        centerX, centerY,
        radius,
        offsetX, offsetY
    };
}


function generateMiniArrows() {

    miniArrowsContainer.innerHTML = "";

    const geo = computeClockGeometry();
    const { centerX, centerY, radius, offsetX, offsetY } = geo;

    // ORE
    for (let deg = 0; deg < 360; deg += 30) {

        const el = document.createElement("div");
        el.classList.add("hours-arrows-mini", "arrows-mini");

        const rad = (deg - 90) * Math.PI / 180;
        const x = centerX + Math.cos(rad) * radius;
        const y = centerY + Math.sin(rad) * radius;

        el.style.left = (x + offsetX + 4) + "px";
        el.style.top  = (y + offsetY + 3) + "px";
        el.style.transform = `rotate(${deg}deg)`;

        miniArrowsContainer.appendChild(el);
    }

    // MINUTI
    for (let deg = 0; deg < 360; deg += 6) {

        if (deg % 30 === 0) continue;

        const el = document.createElement("div");
        el.classList.add("minutes-arrows-mini", "arrows-mini");

        const rad = (deg - 90) * Math.PI / 180;
        const x = centerX + Math.cos(rad) * radius;
        const y = centerY + Math.sin(rad) * radius;

        el.style.left = (x + offsetX + 7.7) + "px";
        el.style.top  = (y + offsetY + 4) + "px";
        el.style.transform = `rotate(${deg}deg)`;

        miniArrowsContainer.appendChild(el);
    }
}


//SELECTION CLOCKS
function controlCase() {

    font = clocks[clockSelectedIndex].toLowerCase();

    if (font === "digital") {
        analogClockContainer.classList.add("hidden");
        digitalClockContainer.classList.remove("hidden");
    }
    else{
        analogClockContainer.classList.remove("hidden");
        digitalClockContainer.classList.add("hidden");
        timeContainer.textContent = "";
    }

    body.style.fontFamily = (font === "math") ? "mathFont" : font;
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

    hoursNumbersContainer.innerHTML = "";

    const geo = computeClockGeometry();
    const { centerX, centerY, radius, offsetX, offsetY } = geo;

    const radiusNumbers = radius * 0.90;

    for (let index = 0; index < 12; index++) {

        const hourNumber = document.createElement("div");
        hourNumber.classList.add("hour-number");
        hoursNumbersContainer.appendChild(hourNumber);
        let mathX = 0;
        let mathY = 0;

        if (font === "analog") {
            hourNumber.textContent = index + 1;
            hourNumber.style.fontFamily = "Courier New";
        } 
        else if (font === "roman") {
            hourNumber.textContent = romanHours[index];
        } 
        else if (font === "math") {
            hourNumber.textContent = mathHours[index];
            mathX = 4;
            mathY = 4;
        }

        const deg = index * 30;
        const rad = (deg - 60) * Math.PI / 180;

        const x = centerX + Math.cos(rad) * radiusNumbers;
        const y = centerY + Math.sin(rad) * radiusNumbers;

        hourNumber.style.left = (x + offsetX + 4 - mathX) + "px";
        hourNumber.style.top  = (y + offsetY + 4 - mathY)   + "px";
    }

    generateMiniArrows()
}, 100);
