import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if ( selectedDates[0] <= new Date()) {
          Notify.failure("Please choose a date in the future");
      } else {
            refs.btn.removeAttribute('disabled');
      };
    },
};

const calendar = flatpickr(refs.input, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

refs.btn.addEventListener('click', () => {
   const timerId =  setInterval(() => {
      const timer = calendar.selectedDates[0].getTime() - Date.now();
      const startTimer = convertMs(timer)
      refs.days.textContent = startTimer.days;
      refs.hours.textContent = startTimer.hours;
      refs.minutes.textContent = startTimer.minutes;
      refs.seconds.textContent = startTimer.seconds;
      if (timer <= 1000) {
        clearInterval(timerId);
     };
    }, 1000);
    
});

