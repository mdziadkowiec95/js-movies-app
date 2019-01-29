export const elements = {
  searchForm: document.querySelector('.search'),
  searchTextField: document.querySelector('.search__text-field'),
  searchYearsSelect: document.querySelector('.search__years-field'),
  results: document.querySelector('.results'),
  resultsList: document.querySelector('.results__list')
};

export const renderLoader = () => {
  const loader = `
      <div class="loader">
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
        <span class="loader__dot"></span>
      </div>
  `;

  elements.results.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  elements.results.removeChild(document.querySelector('.loader'));
};
