import axios from 'axios';
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

axios.defaults.headers.common['x-api-key'] = API_KEY;
let errorShown = false;

async function fetchBreeds() {
  const END_POINT = '/breeds';
  try {
    const response = await axios.get(`${BASE_URL}${END_POINT}`);
    return response.data;
  } catch (error) {
    handleError();
    throw new Error(error.message);
  }
}

async function fetchCatByBreed(breedId) {
  if (!breedId) {
    return;
  }
  console.log(breedId);
  const END_POINT = '/images/search';
  const params = { breed_ids: breedId };
  try {
    const response = await axios.get(`${BASE_URL}${END_POINT}`, { params });
    return response.data;
  } catch (error) {
    handleError();
    throw new Error(error.message);
  }
}

function handleError() {
  if (!errorShown) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topRight',
      timeout: 5000,
      closeOnClick: true,
    });
    errorShown = true;
  }
}

export { fetchBreeds, fetchCatByBreed };
