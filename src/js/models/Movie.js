import axios from 'axios';
import { APIkey } from '../config';

export default class Movie {
  constructor(id) {
    this.id = id;
  }

  async getMovie() {
    const res = await axios(
      `http://www.omdbapi.com/?apikey=${APIkey}&i=${this.id}`
    );

    this.title = res.data.Title;
    this.year = res.data.Year;
    this.runtime = res.data.Runtime;
    this.plot = res.data.Plot;
    this.poster = res.data.Poster;
    this.rating = res.data.imdbRating;
    this.votes = res.data.imdbVotes;
    this.website = res.data.Website;
    this.details = {
      director: res.data.Director,
      writer: res.data.Writer,
      genre: res.data.Genre,
      country: res.data.Country,
      production: res.data.Production,
      released: res.data.Released,
      budget: res.data.BoxOffice,
      awards: res.data.Awards
    };
  }
}
