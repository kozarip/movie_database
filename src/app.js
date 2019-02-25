console.log('App is running')

import './styles/styles.scss';

import MovieConnector from './classes/MovieConnector.js'
import MovieList from './classes/MovieList.js'
import MovieDetails from './classes/MovieDetails.js'
import Pagination from './classes/Pagination.js'
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
        movieConnector.fetchFromServer(movieConnector.link+"search12/multi?api_key="+movieConnector.api_key+"&language=en-US&query="+encodeURI(movieTitle)+"&page="+page),
        movieConnector.fetchFromServer(movieConnector.link+"genre/movie/list?api_key="+movieConnector.api_key+"&language=en-US")
    ]).then(([movies, genres]) => {
        if(movies.status_code){
            errorHandler.handler(movies);
        } else if(genres.status_code){
            errorHandler.handler(genres);
        } else{
            searchedMovieTitle = movieTitle;
            movieList.renderMovies(movies,genres,pagination);
        }
    }).catch((error) => {
        errorHandler.handler(error)
    });

    document.querySelector('#loader').classList.add('hidden');
}

//Search movies
searchForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    if(event.target.elements.movie.value.length < 3){
        errorHandler.handler("Type at least 3 characters");
        return;
    }
    searchMovie(event.target.elements.movie.value, 1)
})

document.addEventListener('click',(e) => {
    //Show movie details in dialog
    if(e.target && e.target.parentElement && e.target.parentElement.className.includes('movie') ) {
        document.querySelector('#loader').classList.remove('hidden');

        movieConnector.fetchFromServer( movieConnector.link+"movie/"+e.target.parentElement.getAttribute("data-id")+"?api_key="+movieConnector.api_key+"&language=en-US" ).then((details)=>{
            movieDetails.renderDetails(details);
            document.querySelector('#dialogContainer').classList.remove('hidden')
            document.querySelector('#loader').classList.add('hidden');
        }).catch((error) => {
            errorHandler.handler(error)
        });
    }

    //Do pagination
    if(e.target && e.target.className.includes('pageNumber') ) {
        searchMovie(searchedMovieTitle, e.target.innerHTML);
    }
 });
