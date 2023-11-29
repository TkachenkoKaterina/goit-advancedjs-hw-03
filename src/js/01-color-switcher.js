const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyRefs = document.querySelector('body');

let intervalId = null;
btnStop.disabled = true;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function onStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  changeColors();
  intervalId = setInterval(changeColors, 1000);
}

function onStop() {
  clearTimeout(intervalId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColors() {
  bodyRefs.style.backgroundColor = getRandomHexColor();
}
