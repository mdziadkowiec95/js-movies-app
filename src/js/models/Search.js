import axios from 'axios';
import { APIkey } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(page) {
    const request = this.query.year
      ? `s=${this.query.title}&y=${this.query.year}`
      : `s=${this.query.title}`;

    const results = await axios(
      `https://www.omdbapi.com/?apikey=${APIkey}&${request}&page=${page}`
    );
    this.result = results.data.Search;
    this.total = results.data.totalResults;
    this.query.page = page;
  }
}
