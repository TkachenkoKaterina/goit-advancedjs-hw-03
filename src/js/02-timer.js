import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const totalDays = document.querySelector('span[data-days]');
const totalHours = document.querySelector('span[data-hours]');
const totalMinutes = document.querySelector('span[data-minutes]');
const totalSeconds = document.querySelector('span[data-seconds]');

let selectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate < now) {
      iziToast.warning({
        title: 'Warning😯',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'tomato',
      });
    } else {
      btnStart.disabled = false;
    }
  },
};

btnStart.disabled = true;

flatpickr('input#datetime-picker', options);

btnStart.addEventListener('click', onStart);

function onStart() {
  iziToast.success({
    title: '⏰',
    message: 'Hurry up! Time has passed',
    position: 'topRight',
    backgroundColor: 'green',
  });
  btnStart.disabled = true;
  inputDate.disabled = true;
  intervalId = setInterval(updateTime, 1000);
}

function updateTime() {
  const remainingTime = selectedDate - new Date();
  if (remainingTime < 1) {
    clearInterval(intervalId);
    iziToast.error({
      title: 'Друже😎',
      message: 'Time is up!',
      position: 'topRight',
      backgroundColor: 'red',
    });
    return;
  }

  const convertedTime = convertMs(remainingTime);
  updateDOM(convertedTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateDOM({ days, hours, minutes, seconds }) {
  updateElement(totalDays, days);
  updateElement(totalHours, hours);
  updateElement(totalMinutes, minutes);
  updateElement(totalSeconds, seconds);
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    btnStart.disabled = false;
    inputDate.disabled = false;
  }
}

function updateElement(element, value) {
  if (value.toString().length < 2) {
    const renderValue = value.toString().padStart(2, '0');
    element.textContent = renderValue;
  } else {
    element.textContent = value.toString().padStart(2, '0');
  }
}
