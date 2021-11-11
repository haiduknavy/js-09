
const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

refs.stop.setAttribute('disabled', true);
let timerId = null;

   function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBgColor = function () {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function onClickStart(e) {
    timerId = setInterval(changeBgColor, 1000);
    if (refs.stop.hasAttribute('disabled')) {
        refs.start.setAttribute('disabled', true);
        refs.stop.removeAttribute('disabled')
    };
};

function onClickStop(e) {
    clearInterval(timerId);
    if (refs.start.hasAttribute('disabled')) {
        refs.start.removeAttribute('disabled');
        refs.stop.setAttribute('disabled', true);
    };
};

refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);