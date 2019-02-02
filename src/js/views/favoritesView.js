import { elements, toggleSlide } from './base';



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
              <img class="favorites__image" src="${movie.poster}"
                alt="${movie.title}">
            </div>
            <h3 class="favorites__title">${movie.title}</h3>
          </a>
      </li>
  `;

  elements.favoritesList.insertAdjacentHTML('beforeend', markup);
};

export const removeItem = id => {
  const el = document.querySelector(`.favorites__link[href="#${id}"]`).parentElement;
  if (el) elements.favoritesList.removeChild(el);
};