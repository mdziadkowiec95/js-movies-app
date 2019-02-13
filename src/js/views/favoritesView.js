import { elements, paths, toggleSlide } from './base';

// This fixes toggleSlide height bug after adding new item to Favorite list
const fixSlideBug = () => {
  elements.favoritesList.style.height = 'auto';

  const height = elements.favoritesList.clientHeight + 'px';

  setTimeout(() => elements.favoritesList.style.height = height, 0);
};

export const toggleFavBtn = (isFav) => {
  const btn = document.querySelector('.preview__btn--like');
  isFav ? btn.classList.add('active') : btn.classList.remove('active');
};

export const toggleFavList = () => {
  toggleSlide(elements.favoritesList, 'favorites__list--active');
};

export const addItem = movie => {
  const markup = `
        <li class="favorites__list-item">
          <a class="favorites__link" href="#${movie.id}">
            <div class="favorites__image-box">
              <img class="favorites__image" src="${movie.poster !== 'N/A' ? movie.poster : paths.noImg}"
                alt="${movie.title}">
            </div>
            <h3 class="favorites__title">${movie.title}</h3>
          </a>
      </li>
  `;

  elements.favoritesList.insertAdjacentHTML('beforeend', markup);

  fixSlideBug();
};

export const removeItem = id => {
  const el = document.querySelector(`.favorites__link[href="#${id}"]`).parentElement;
  if (el) elements.favoritesList.removeChild(el);
};