console.log('App is running')

import './styles/styles.scss';
import SearchMovies from './classes/search-movies.js'
import MovieDetails from './classes/movie-details.js'

const searcher = new SearchMovies(".resultContainer");
const movieDetails = new MovieDetails("#dialogContainer");


document.getElementById("searchForm").addEventListener("submit", (event)=>{
    event.preventDefault()
    searcher.fetchMovies(event.target.elements.movie.value,1)
})
searcher.fetchMovies("game",1)
movieDetails.fetchDetails("348350");