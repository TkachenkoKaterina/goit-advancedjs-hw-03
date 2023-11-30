import iziToast from 'izitoast';
import '../node_modules/izitoast/dist/css/iziToast.min.css';

const elements = {
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  cat: document.querySelector('.cat-info'),
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_RjEIYRa9UIQiuCs0GBjhWjiTFUMeoAxHOIJdhn6UnuIPCQmVsxmCCshAFLBdwlby';

function fetchBreeds() {
  const END_POINT = '/breeds1';
  return fetch(`${BASE_URL}${END_POINT}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function fetchCatByBreed(breedId) {
  if (!breedId) {
    return;
  }
  console.log(breedId);
  const END_POINT = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return fetch(`${BASE_URL}${END_POINT}?${params}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(resp) {
  if (!resp.ok) {
    handleError();
    throw new Error(resp.statusText);
  }
  return resp.json();
}

function handleError() {
  iziToast.error({
    title: 'Error',
    message: 'Oops! Something went wrong! Try reloading the page!',
    position: 'topRight',
    timeout: 5000,
    closeOnClick: true,
  });
}

export { fetchBreeds, fetchCatByBreed };
