// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputTimer: document.querySelector('#datetime-picker'),
  timerContainer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log('refs.startBtn', refs.startBtn);
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else refs.startBtn.disabled = false;
  },
};
flatpickr(text, options);
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
function addLeadingZero(value) {
  return value.tostring().padStart(2, '0');
}
refs.startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let timeCounter = new Date(text.value) - new Date();
    console.log(timeCounter);
    refs.startBtn.disabled = true;
    if (timeCounter >= 0) {
      let timeOdj = convertMs(timeCounter);
    }
  });
});
