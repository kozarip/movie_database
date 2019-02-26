console.log('App is running')

import './styles/styles.scss';

import MovieConnector from './classes/MovieConnector'
import MovieList from './classes/MovieList'
import MovieDetails from './classes/MovieDetails'
import Pagination from './classes/Pagination'
import ErrorHandler from './classes/utils/ErrorHandler';

const movieConnector = new MovieConnector()
const movieList = new MovieList("#resultContainer");
const movieDetails = new MovieDetails(".dialogContent");
const pagination = new Pagination();
const errorHandler = new ErrorHandler("#errorMessageConatiner");

const searchForm = document.getElementById("searchForm");
let searchedMovieTitle = "";

const searchMovie = (movieTitle, page) => {
    document.querySelector('#loader').classList.remove('hidden');

    Promise.all([
        movieConnector.fetchMovies(movieTitle, page),
        movieConnector.fetchGenres()
    ]).then(([movies, genres]) => {
        if(movies.status_code){
            errorHandler.handle(movies);
        } else if(genres.status_code){
            errorHandler.handle(genres);
        } else{
            searchedMovieTitle = movieTitle;
            movieList.renderMovies(movies,genres,pagination);
        }
    }).catch((error) => {
        errorHandler.handle(error)
    });

    document.querySelector('#loader').classList.add('hidden');
}

//Search movies
searchForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    if(event.target.elements.movie.value.length < 3){
        errorHandler.handle("Type at least 3 characters");
        return;
    }
    searchMovie(event.target.elements.movie.value, 1)
})

document.addEventListener('click',(e) => {
    //Show movie details in dialog
    if(e.target && e.target.parentElement && e.target.parentElement.className.includes('movie') ) {
        document.querySelector('#loader').classList.remove('hidden');

        movieConnector.fetcDetails(e.target.parentElement.getAttribute("data-id")).then((details)=>{
            movieDetails.renderDetails(details);
            document.querySelector('#dialogContainer').classList.remove('hidden')
            document.querySelector('#loader').classList.add('hidden');
        }).catch((error) => {
            errorHandler.handle(error)
        });
    }

    //Do pagination
    if(e.target && e.target.className.includes('pageNumber') ) {
        pagination.setCurrentPage(e.target.innerHTML);
        searchMovie(searchedMovieTitle, e.target.innerHTML);
    }
 });
