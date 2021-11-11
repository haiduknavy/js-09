import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]')
}

 function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
    resolve({ position, delay })
  } else {
      reject({ position, delay })
      }
    }, delay);
  });
  return promise;
};

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
 
  const firstDelay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  let delay = firstDelay;
  for (let i = 1; i <= amount; i += 1){
    delay += step
     createPromise(i, delay)
     .then(({ position, delay }) => {
    setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }, delay);
  })
       .catch(({ position, delay }) => {
    setTimeout(() => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
  }
});