import { elements, paths } from './base';

export const getInput = () => {
  return {
    title: elements.searchTextField.value,
    year:
      parseFloat(elements.searchYearsSelect.value) > 1900
        ? elements.searchYearsSelect.value
        : ''
  };
};

export const clearInputs = () => {
  elements.searchTextField.value = '';
  elements.searchYearsSelect.value = '';
};

export const clearResults = () => {
  elements.resultsList.innerHTML = '';
  clearPagination();
};

export const makeMovieSelected = id => {
  const resultLinks = Array.from(document.querySelectorAll('.results__link'));

  if (resultLinks.length > 0) {
    resultLinks.forEach(el => {
      if (el.dataset.id === id) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
};

const renderItem = movie => {
  const markup = `
    <li class="results__item">
      <a href="#${movie.imdbID}" class="results__link" data-id="${movie.imdbID}">
        <div class="results__image-box">
          <img src="${
    movie.Poster !== 'N/A' ? movie.Poster : paths.noImg
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

const makeButton = (type, state) => `
      <button class="pagination__btn pagination__btn--${type} btn btn--primary${
  state === 'disabled' ? ' disabled' : ''
  }">${type === 'prev' ? '<i class="fas fa-arrow-left"></i>' : '<i class="fas fa-arrow-right"></i>'}</button>
  `;

const clearPagination = () => {
  elements.pagination.innerHTML = '';
};

const renderPagination = (page, total) => {
  const pages = Math.ceil(parseFloat(total) / 10); // available pages for current search

  let button;

  if (page === 1) {
    button = `
      ${makeButton('prev', 'disabled')}
      ${pages > 1 ? makeButton('next') : makeButton('next', 'disabled')}
    `;
  } else if (page < pages) {
    button = `
      ${makeButton('prev')}
      ${makeButton('next')}
    `;
  } else {
    button = `
    ${makeButton('prev')}
    ${makeButton('next', 'disabled')}
  `;
  }

  const pagination = `
    ${button}
    <span class="pagination__pages">${page} of ${pages}</span>
  `;

  elements.pagination.insertAdjacentHTML('afterbegin', pagination);
};

export const renderResults = (movies, page, total) => {
  movies.forEach(el => renderItem(el));
  clearPagination();
  renderPagination(page, total);
};
