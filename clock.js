//VARS
const clocks = ["Digital", "Analog", "Roman", "Math", "Programmer"]
let clockSelectedIndex = 0;
let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();

// CONTAINERS
const clockSelectedContainer = document.getElementById("clock-selected");
clockSelectedContainer.textContent = clocks[clockSelectedIndex];
const body = document.body;
body.classList.add("digital");

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
    if (clockSelectedIndex-1<0) {
        clockSelectedIndex = clocks.length-1;
        clockSelectedContainer.textContent = clocks[clockSelectedIndex];
    }
    else{
        clockSelectedContainer.textContent = clocks[--clockSelectedIndex];
    }
    let font = clocks[clockSelectedIndex].toLowerCase();

    body.style.fontFamily = (
        font.toLowerCase()=="math")?
        "mathFont":
        font.toLowerCase();
});

rightArrow.addEventListener("click", () => {
    if (clockSelectedIndex+1>clocks.length-1) {
        clockSelectedIndex = 0;
        clockSelectedContainer.textContent = clocks[clockSelectedIndex];
    }
    else{
        clockSelectedContainer.textContent = clocks[++clockSelectedIndex];
    }
    let font = clocks[clockSelectedIndex].toLowerCase();

    body.style.fontFamily = (
        font.toLowerCase()=="math")?
        "mathFont":
        font.toLowerCase();
});



