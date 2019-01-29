// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

// // We are only using the user-astronaut icon
// library.add(faUserAstronaut);

// // Replace any existing <i> tags with <svg> and set up a MutationObserver to
// // continue doing this as the DOM changes.
// dom.watch();

// import './views/base';
import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';
const styles = require('../scss/app.scss');

const state = {};

window.state = state;

/**
 * Search
 * Movie
 *
 *
 */

const controlSearch = async (page = 1) => {
  const query = searchView.getInput();
  // debugger;

  if (query.title !== '') {
    console.log('ok');
    state.search = new Search(query);

    searchView.clearResults();
    renderLoader();

    try {
      await state.search.getResults(page);

      clearLoader();

      searchView.renderResults(
        state.search.result,
        state.search.query.page,
        state.search.total
      );
    } catch (error) {
      alert(error);
      clearLoader();
    }
  } else {
    // show alert
    console.log('false');
  }

  console.log(state.search);
};

// controlSearch handler
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.pagination.addEventListener('click', e => {
  if (!isNaN(state.search.query.page)) {
    if (e.target.matches('.pagination__btn--next')) {
      controlSearch(state.search.query.page + 1);
    } else if (e.target.matches('.pagination__btn--prev')) {
      controlSearch(state.search.query.page - 1);
    }
  }
});
