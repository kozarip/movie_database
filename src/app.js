console.log('App is running')

import './styles/styles.scss';
import MovieList from './classes/MovieList.js'
import MovieDetails from './classes/MovieDetails.js'

const movieList = new MovieList(".resultContainer");
const movieDetails = new MovieDetails("#dialogContainer");


window.showMovieDetails = function(movieID){
    movieDetails.fetchDetails(movieID);
}

document.getElementById("searchForm").addEventListener("submit", (event)=>{
    event.preventDefault()
    movieList.fetchMovies(event.target.elements.movie.value,1)
})

document.addEventListener('click',(e) => {
    if(e.target && e.target.parentElement.className.includes('movie') ) {
        movieDetails.fetchDetails(e.target.parentElement.getAttribute("data-id"));
    }
 });

 movieList.fetchMovies("Star",1)