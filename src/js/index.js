// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

// // We are only using the user-astronaut icon
// library.add(faUserAstronaut);

// // Replace any existing <i> tags with <svg> and set up a MutationObserver to
// // continue doing this as the DOM changes.
// dom.watch();

import './experiments';
import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import Movie from './models/Movie';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
const styles = require('../scss/app.scss');

const state = {};

window.state = state;

/**
 * Search
 * Movie
 *
 *
 */

const controlSearch = async (page = 1, mode = 'search') => {
  let query;

  if (mode === 'search') {
    query = searchView.getInput();
  } else if (mode === 'paginator') {
    query = state.search.query;
  }

  // debugger;

  if (query.title !== '') {
    console.log('ok');
    state.search = new Search(query);

    searchView.clearInputs();
    searchView.clearResults();
    renderLoader(elements.results);

    try {
      await state.search.getResults(page);

      clearLoader(elements.results);

      searchView.renderResults(
        state.search.result,
        state.search.query.page,
        state.search.total
      );
    } catch (error) {
      alert(`There was a problem with searching movies ---> ${error}`);
      clearLoader(elements.results);
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
      controlSearch(state.search.query.page + 1, 'paginator');
    } else if (e.target.matches('.pagination__btn--prev')) {
      controlSearch(state.search.query.page - 1, 'paginator');
    }
  }
});

const controlMovie = async () => {
  const id = window.location.hash.substr(1);

  if (id) {
    //create new Movie instance
    state.movie = new Movie(id);

    // prepare UI
    movieView.clearMovie();
    renderLoader(elements.preview);

    try {
      // get movie data (by id)
      await state.movie.getMovie();

      console.log(state.movie);

      clearLoader(elements.preview);

      movieView.renderMovie(state.movie);
    } catch (error) {
      alert(`There was a problem with getting single movie ---> ${error}`);
    }
  }
};

// Set event listeners for handling controling single movie preview
['hashchange'].forEach(event => window.addEventListener(event, controlMovie));
