export default class Favorites {
  constructor() {
    this.movies = [];
  }

  addItem(id, title, poster) {
    const newItem = { id, title, poster };
    this.movies.push(newItem);

    return newItem;
  }

  removeItem(id) {
    // debugger;
    const elIndex = this.movies.findIndex(el => el.id === id)
    this.movies.splice(elIndex, 1);
  }

  isFav(id) {
    console.log(this.movies.findIndex(el => el.id === id));
    return this.movies.findIndex(el => el.id === id) >= 0;
  }


}