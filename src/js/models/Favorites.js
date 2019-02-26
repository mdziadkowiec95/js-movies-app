export default class Favorites {
  constructor() {
    this.movies = [];
  }

  addItem(id, title, poster) {
    const newItem = { id, title, poster };
    this.movies.push(newItem);

    this.saveData();

    return newItem;
  }

  removeItem(id) {
    // debugger;
    const elIndex = this.movies.findIndex(el => el.id === id)
    this.movies.splice(elIndex, 1);

    this.saveData();
  }

  isFav(id) {
    console.log(this.movies.findIndex(el => el.id === id));
    return this.movies.findIndex(el => el.id === id) >= 0;
  }

  saveData() {
    localStorage.setItem('favorites', JSON.stringify(this.movies));
  }

  readData() {
    const data = JSON.parse(localStorage.getItem('favorites'));

    if (data) this.movies = data;
  }


}