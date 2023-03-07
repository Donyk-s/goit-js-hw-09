import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  btnCreatePromise: document.querySelector('button[type="submit"]'),
};
// console.log(form);
// console.log(delay);
// console.log(step);
// console.log(amount);
console.log(refs.btnCreatePromise);

// функція для створення обіцянки
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

// додавання слухача події для кнопки
refs.btnCreatePromise.addEventListener('click', e => {
  e.preventDefault(); // відміна оновлення сторінки

  let firstDelay = Number(refs.delay.value); // конвертація затримки в ЧИСЛО
  let delayStep = Number(refs.step.value); // конвертація кроку в ЧИСЛО
  console.log(delayStep);
  // цикл для перебору кількості введень
  for (let i = 0; i < refs.amount.value; i += 1) {
    // Передача: номера промісу, першу затримку, введену користувачем, і крок.
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        // відображення повідомленя-успіху користувачеві з бібліотеки Notiflix
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // відображення повідомленя-помилки користувачеві з бібліотеки Notiflix
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  form.reset(); // очищення поля форми
});
