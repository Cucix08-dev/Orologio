//VARS
const clocks = ["Digital", "Analog", "Roman", "Math", "Programmer"]
let clockSelectedIndex = 0;

// CONTAINERS
const analogClockContainer = document.getElementById("analog-clock");
analogClockContainer.classList.add("hidden");

const digitalClockContainer = document.getElementById("digital-clock");
const timeContainer = document.getElementById("time-standard") //ONLY FOR DIGITAL CLOCK

const clockSelectedContainer = document.getElementById("clock-selected");
clockSelectedContainer.textContent = clocks[clockSelectedIndex];

const body = document.body;
body.classList.add("digital");

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

function controlCase(){
    let font = clocks[clockSelectedIndex].toLowerCase();

    if(clocks[clockSelectedIndex].toLowerCase() == "digital"){
        digitalClockContainer.classList.remove("hidden");
        analogClockContainer.classList.add("hidden");
    }
    else{
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
}, 100);

