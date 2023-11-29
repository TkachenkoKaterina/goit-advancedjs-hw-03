import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  btnCreat: document.querySelector('form button'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  refs.btnCreat.disabled = true;

  const delayValue = parseInt(refs.form.elements.delay.value);
  const stepValue = parseInt(refs.form.elements.step.value);
  const amountValue = parseInt(refs.form.elements.amount.value);

  generatePromises(amountValue, delayValue, stepValue);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function generatePromises(amount, firstDelay, step) {
  let generatedPromises = 0;

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Fulfilled',
          message: `🤩Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Rejected',
          message: `😈Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
          timeout: 2000,
        });
      })
      .finally(() => {
        generatedPromises += 1;

        if (generatedPromises === amount) {
          refs.btnCreat.disabled = false;
        }
      });
  }
}
