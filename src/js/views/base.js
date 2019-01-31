export const elements = {
  mainWrapper: document.querySelector('.main-wrapper'),
  searchForm: document.querySelector('.search'),
  searchTextField: document.querySelector('.search__text-field--title'),
  searchYearsSelect: document.querySelector('.search__text-field--years'),
  results: document.querySelector('.results'),
  resultsList: document.querySelector('.results__list'),
  preview: document.querySelector('.preview'),
  pagination: document.querySelector('.pagination')
};

const elementStrings = {
  loader: 'loader'
};

export const toggleViews = view => {
  if (view === 'search') {
    elements.mainWrapper.classList.remove('preview-mode');
    elements.mainWrapper.classList.add('searching-mode');
    elements.preview.classList.remove('js-active');
    elements.results.classList.add('js-active');
  } else {
    elements.mainWrapper.classList.remove('searching-mode');
    elements.mainWrapper.classList.add('preview-mode');
    elements.preview.classList.add('js-active');
    elements.results.classList.remove('js-active');
  }
};

export const renderLoader = parentEl => {
  const loader = `
      <div class="${elementStrings.loader}">
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
      </div>
  `;

  parentEl.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = parentEl => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) parentEl.removeChild(loader);
};
