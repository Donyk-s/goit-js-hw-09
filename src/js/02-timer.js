// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   inputTimer: document.querySelector('#datetime-picker'),
//   timerContainer: document.querySelector('.timer'),
//   days: document.querySelector('span[data-days]'),
//   hours: document.querySelector('span[data-hours]'),
//   minutes: document.querySelector('span[data-minutes]'),
//   seconds: document.querySelector('span[data-seconds]'),
// };
// // console.log('refs.startBtn', refs.startBtn);
// refs.startBtn.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] < new Date()) {
//       refs.startBtn.disabled = true;
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       refs.startBtn.disabled = false;
//     }
//   },
// };
// flatpickr(refs.inputTimer, options);
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
// refs.startBtn.addEventListener('click', () => {
//   let timer = setInterval(() => {
//     let timeCounter = new Date(refs.inputTimer.value) - new Date();
//     console.log(timeCounter);
//     refs.startBtn.disabled = true;
//     if (timeCounter >= 0) {
//       let timeOdj = convertMs(timeCounter);
//       console.log(timeOdj);
//       refs.days.textContent = addLeadingZero(timeOdj.days);
//       refs.hours.textContent = addLeadingZero(timeOdj.hours);
//       refs.minutes.textContent = addLeadingZero(timeOdj.minutes);
//       refs.seconds.textContent = addLeadingZero(timeOdj.seconds);

//       if (timeCounter <= 10000) {
//         refs.timerContainer.style.color = 'green';
//       }
//     } else {
//       Notiflix.Notify.success('Timer is finished');
//       refs.timerContainer.style.color = 'orange';
//       // clearInterval(timer);
//     }
//   }, 1000);
// });
// /--------------------------------------------
const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btnStart.disabled = true; // початковий стан кнопки: вимкнена

// об'єкт параметрів
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // виклик щоразу під час закриття елемента інтерфейсу

    // перевірка на вибір майбутньої дати, а не минулої
    if (selectedDates[0] < new Date()) {
      // відображення повідомленя користувачеві з бібліотеки Notiflix
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true; // деактивація кнопки СТАРТ
    } else {
      // якщо обрана майбутня дата - то активувати кнопку СТАРТ
      btnStart.disabled = false;
    }
  },
};

// виклик функції для кросбраузерного вибору кінцевої дати та часу
flatpickr(text, options);

// Функція для підрахунку значень
function convertMs(ms) {
  // ms - різниця між кінцевою і поточною датою в мілісекундах

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

// функція яка форматує значення (додає 0, якщо в числі менше двох символів)
function addLeadingZero(value) {
  // приведення до строки та додавання нуля
  return value.toString().padStart(2, '0');
}

// додаємо слухача події до кнопки СТАРТ
btnStart.addEventListener('click', () => {
  // додаємо таймер при кліку
  let timer = setInterval(() => {
    // Зворотній відлік.
    // Віднімання між кінцевою і поточною датою.
    let countdown = new Date(text.value) - new Date();

    btnStart.disabled = true; // деактивація кнопки СТАРТ

    // перевірка на звортній відлік
    if (countdown >= 0) {
      // конвертація значень
      let timeObject = convertMs(countdown);

      // додаємо 0, якщо в числі менше двох символів
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);

      // якщо зоротній відлік меньше-рвіне 10 секунд
      if (countdown <= 1000) {
        timerHtml.style.color = 'red'; // зафарбувати текст в червоний
      }
    } else {
      // відображення повідомленя користувачеві з бібліотеки Notiflix
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'black'; // зафарбувати текст в чорний
      clearInterval(timer); // очистити таймер
    }
  }, 1000); // обчислювати раз на секунду, скільки часу залишилось до вказаної дати
});
