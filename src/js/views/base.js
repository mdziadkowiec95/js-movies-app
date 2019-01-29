export const elements = {
  searchForm: document.querySelector('.search'),
  searchTextField: document.querySelector('.search__text-field--title'),
  searchYearsSelect: document.querySelector('.search__text-field--years'),
  results: document.querySelector('.results'),
  resultsList: document.querySelector('.results__list'),
  pagination: document.querySelector('.pagination')
};

const elementStrings = {
  loader: 'loader'
};

export const renderLoader = () => {
  const loader = `
      <div class="${elementStrings.loader}">
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
      </div>
  `;

  elements.results.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) elements.results.removeChild(loader);
};
