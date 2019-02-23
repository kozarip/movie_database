console.log('App is running')

import './styles/styles.scss';
import SearchMovies from './classes/search-movies.js'

const searcher = new SearchMovies(".resultContainer");

document.getElementById("searchForm").addEventListener("submit", (event)=>{
    event.preventDefault()
    searcher.getMovies(event.target.elements.movie.value,1)
})
