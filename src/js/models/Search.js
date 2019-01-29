import axios from 'axios';
import { APIkey } from '../config';

// const test = async () => {
//   const res = await axios(
//     `http://www.omdbapi.com/?apikey=${APIkey}&s=american&y=1999`
//   );
//   console.log(res);
// };

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(page) {
    const request = this.query.year
      ? `s=${this.query.title}&y=${this.query.year}`
      : `s=${this.query.title}`;

    const results = await axios(
      `http://www.omdbapi.com/?apikey=${APIkey}&${request}&page=${page}`
    );
    this.result = results.data.Search;
  }
}
