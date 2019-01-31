import { elements } from './base';

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

const makeButton = (type, state) => `
      <button class="pagination__btn pagination__btn--${type} btn btn--primary${
  state === 'disabled' ? ' disabled' : ''
}">${type === 'prev' ? '&larr;' : '&rarr;'}</button>
  `;

const clearPagination = () => {
  elements.pagination.innerHTML = '';
};

const renderPagination = (page, total) => {
  // debugger;
  const pages = Math.ceil(parseFloat(total) / 10); // available pages for current search

  // console.log(pages);

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
