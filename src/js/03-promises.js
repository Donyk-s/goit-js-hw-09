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

refs.btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();

  let firstDelay = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);
  // console.log(delayStep);
  for (let i = 0; i < refs.amount.value; i += 1) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  form.reset();
});
