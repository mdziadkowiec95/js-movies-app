import { elements, toggleViews, toggleSidebar, renderLoader, clearLoader, renderErrorMsg, scrollToTop } from './views/base';
import Search from './models/Search';
import Movie from './models/Movie';
import Favorites from './models/Favorites';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as favoritesView from './views/favoritesView';

const styles = require('../scss/app.scss');

// Application state object

const state = {};

/**
 * Search 
 * Movie
 * Favorites
 *
 */

window.state = state;

const controlSearch = async (page = 1, mode = 'search') => {
  let query;
  // debugger;

  if (mode === 'search') {
    query = searchView.getInput(); // new query
  } else if (mode === 'paginator') {
    query = state.search.query; // next/prev page query
  }

  if (query.title !== '') {

    state.search = new Search(query);

    searchView.clearInputs();
    searchView.clearResults();
    toggleViews('search');
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
      // alert(`There was a problem with searching movies ---> ${error}`);
      state.modal = true;
      searchView.clearResults();
      renderErrorMsg(elements.resultsList, 'search', query);
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
    if (e.target.matches('.pagination__btn--next:not(.disabled)')) {
      controlSearch(state.search.query.page + 1, 'paginator');
    } else if (e.target.matches('.pagination__btn--prev:not(.disabled)')) {
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
    toggleViews('preview');
    scrollToTop();
    movieView.clearMovie();
    renderLoader(elements.preview);

    try {
      // get movie data (by id)
      await state.movie.getMovie();

      console.log(state.movie);

      clearLoader(elements.preview);
      console.log(state);
      movieView.renderMovie(state.movie, state.favorites.isFav(id));

      if (state.search) searchView.makeMovieSelected(id);
    } catch (error) {
      console.log(error);
      movieView.clearMovie();
      renderErrorMsg(elements.preview, 'preview', id);
    }
  }
};

// Set event listeners for handling controling single movie preview
['load', 'hashchange'].forEach(event => window.addEventListener(event, controlMovie));


const controlFavorites = () => {

  if (!state.favorites) state.favorites = new Favorites();

  const curID = state.movie.id;

  if (!state.favorites.isFav(curID)) {
    // add item to Favorites instance in state
    const newItem = state.favorites.addItem(curID, state.movie.title, state.movie.poster);

    favoritesView.toggleFavBtn(state.favorites.isFav(curID));
    // add item to the UI
    favoritesView.addItem(newItem);

  } else {
    state.favorites.removeItem(curID);

    favoritesView.toggleFavBtn(state.favorites.isFav(curID));

    favoritesView.removeItem(curID);
  }

};

elements.preview.addEventListener('click', e => {
  if (e.target.matches('.preview__btn--back')) {
    toggleViews('search');
  } else if (e.target.matches('.preview__btn--like, .preview__btn--like *')) {
    controlFavorites();
  }
});

elements.sidebar.addEventListener('click', e => {

  if (e.target.matches('.favorites__btn, .favorites__btn *')) {
    favoritesView.toggleFavList();
  } else if (e.target.matches('.sidebar__toggle-btn, .sidebar__toggle-btn *')) {
    toggleSidebar();
  }

});


window.addEventListener('load', () => {

  state.favorites = new Favorites();

  state.favorites.readData();

  state.favorites.movies.forEach(el => favoritesView.addItem(el));

});