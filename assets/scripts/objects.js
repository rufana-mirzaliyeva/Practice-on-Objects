const addMovieBTn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movieList.length === 0){
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter 
  ? movies 
  : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const moviEl = document.createElement('li');

    let {getFormattedTitle}  = movie;
    getFormattedTitle = getFormattedTitle.call(movie);
    //const { title: movieTitle} = info;
    let text = getFormattedTitle() + ' - ';
    for (const key in info){
      if (key !== 'title'){
        text = text + `${key}: ${info[key]}`;
      }
    }
    moviEl.textContent = text;
    movieList.append(moviEl);
  })
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;


  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === '' 
  ) {
    return;
  }
  const newMovie = {
   info: {
    title,
    [extraName]:extraValue
   },
   id:Math.random().toString(),
   getFormattedTitle() {
    return this.info.title.toUpperCase();
   }
  };
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
}

addMovieBTn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
