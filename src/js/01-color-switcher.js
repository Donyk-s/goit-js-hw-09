function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const INTERVAL_DELAY = 1000;
let timerId = null;
const refs = {
  bodyColor: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),

  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    let hexColor = getRandomHexColor();
    refs.bodyColor.style.backgroundColor = hexColor;
  }, INTERVAL_DELAY);
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
});
refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);

  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
});
