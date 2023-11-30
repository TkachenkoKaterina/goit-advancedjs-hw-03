const elements = {
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  cat: document.querySelector('.cat-info'),
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_RjEIYRa9UIQiuCs0GBjhWjiTFUMeoAxHOIJdhn6UnuIPCQmVsxmCCshAFLBdwlby';

elements.error.style.display = 'none';

function fetchBreeds() {
  const END_POINT = '/breeds';
  return fetch(`${BASE_URL}${END_POINT}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function fetchCatByBreed(breedId) {
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
  elements.error.style.display = 'block';
  elements.error.style.color = 'red';
  setTimeout(() => {
    elements.error.style.display = 'none';
  }, 5000);
}

export { fetchBreeds, fetchCatByBreed };
