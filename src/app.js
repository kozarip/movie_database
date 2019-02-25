console.log('App is running')

import './styles/styles.scss';

import MovieConnector from './classes/MovieConnector.js'
import MovieList from './classes/MovieList.js'
import MovieDetails from './classes/MovieDetails.js'
import Pagination from './classes/Pagination.js'

const movieConnector = new MovieConnector()
const movieList = new MovieList("#resultContainer");
const movieDetails = new MovieDetails(".dialogContent");
const pagination = new Pagination();
const errorHandler = new ErrorHandler("#errorMessageConatiner");

const searchForm = document.getElementById("searchForm");
let movieTitle = "";

//Search movies
searchForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    document.querySelector('#loader').classList.remove('hidden');
    if(event.target.elements.movie.value.length < 3){
        alert("Type at least 3 characters");
        return;
    }
    Promise.all([
        movieConnector.fetchMovies(event.target.elements.movie.value,1),
        movieConnector.fetchGenres()
      ]).then(([movies, genres]) => {
        movieTitle = event.target.elements.movie.value;
        movieList.renderMovies(movies,genres,pagination);
        document.querySelector('#loader').classList.add('hidden');
      }).catch((err) => {
          alert("Sorry, we have an error")
          console.log(err);
          document.querySelector('#loader').classList.add('hidden');
      });
})
document.addEventListener('click',(e) => {
    //Show movie details in dialog
    if(e.target && e.target.parentElement && e.target.parentElement.className.includes('movie') ) {
        document.querySelector('#loader').classList.remove('hidden');
        movieConnector.fetchDetails(e.target.parentElement.getAttribute("data-id")).then((details)=>{
            movieDetails.renderDetails(details);
            document.querySelector('#dialogContainer').classList.remove('hidden')
            document.querySelector('#loader').classList.add('hidden');
        })
    }
    //Do pagination
    if(e.target && e.target.className.includes('pageNumber') ) {
        document.querySelector('#loader').classList.remove('hidden');
        movieConnector.fetchMovies( movieTitle ,e.target.innerHTML).then((movies) =>{
            movieConnector.fetchGenres().then((genres)=>{
                pagination.setCurrentPage(e.target.innerHTML)
                movieList.renderMovies(movies,genres,pagination);
                document.querySelector('#loader').classList.add('hidden');
            })
        })
    }
 });
