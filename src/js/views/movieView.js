import { elements, paths } from './base';

export const clearMovie = () => {
  elements.preview.innerHTML = '';
};

export const renderMovie = (movieData, isFav) => {
  const renderDetails = () => {
    // Convert obj to array of key/value pairs ---> ex. ['director', 'Ridley Scott']
    const detailsArr = Object.entries(movieData.details);
    let detailsMarkup = '';

    for (const [label, content] of detailsArr) {
      detailsMarkup += `<p class="preview__label">${label
        .charAt(0)
        .toUpperCase() +
        label.slice(1)}:<span class="preview__info">${content}</span></p>`;
    }

    return detailsMarkup;
  };

  const markup = `
  <button class="preview__btn preview__btn--back btn btn--primary">Back to Search Results</button>
  <div class="preview__top"> 
  <div class="preview__poster">
      <button class="preview__btn preview__btn--like btn btn--primary ${isFav ? 'active' : ''}"><i class="fas fa-heart"></i>
      </button>
    <img src="${movieData.poster !== 'N/A' ? movieData.poster : paths.noImg}" alt="${
    movieData.title
    }" class="preview__poster-img">
  </div>
  <div class="preview__main">
<h2 class="preview__title">${movieData.title}<span class="preview__year">(${
    movieData.year
    })</span></h2>
    <div class="preview__rating">
        <span class="preview__rating-star"><i class="fas fa-star"></i></span>
        <span class="preview__rating-rate">${movieData.rating}</span>
        <span class="preview__rating-votes">(${movieData.votes} votes)</span>
      </div>
    <p class="preview__runtime"><i class="far fa-clock"></i> ${movieData.runtime}</p>
   
    <a href="${
    movieData.website !== 'N/A' && typeof movieData.website !== 'undefined'
      ? movieData.website
      : 'https://www.google.com/search?q=' + movieData.title
    }" class="preview__btn preview__btn--visit btn btn--primary" target="_blank">${
    movieData.website !== 'N/A' && typeof movieData.website !== 'undefined'
      ? 'Visit website'
      : 'Read more'
    }</a>
    
    <p class="preview__plot">${movieData.plot}</p>
  </div>
</div>
<div class="preview__bottom">
    <h3 class="preview__heading preview__heading--details">More information:</h3>
    ${renderDetails()}
</div>

  
  `;

  elements.preview.insertAdjacentHTML('afterbegin', markup);
};
