import { elements } from './base';

export const getInput = () => {
  return {
    title: elements.searchTextField.value,
    year: elements.searchYearsSelect.value
  };
};

export const clearResults = () => {
  elements.resultsList.innerHTML = '';
};

const renderItem = movie => {
  const markup = `
    <li class="results__item">
      <a href="#${movie.imdbID}" class="results__link">
        <div class="results__image-box">
          <img src="${
            movie.Poster !== 'N/A' ? movie.Poster : 'img/no-image.png'
          }" alt="${movie.Title} ${movie.Type}">
        </div>
        <div class="results__info">
          <h3 class="results__title">${movie.Title}</h3>
          <p class="results__type">Type: ${movie.Type}</p>
          <p class="results__year">Release date: <strong>${
            movie.Year
          }</strong></p>
        </div>
      </a>
    </li>
  `;
  elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = movies => {
  movies.forEach(el => renderItem(el));
};
