export default class MoviesList{
    constructor(wrapperHTMLSelector){
        this.wrapperHTMLSelector = wrapperHTMLSelector;
    }

    getGenreNamebyId(id){
        const selectedGenre = this.genres.filter(genre => genre.id == id)[0];
        if(selectedGenre){
            return selectedGenre.name;
        }
        return "";
    }

    renderMovies(movies, genres, pagination){
        console.log(movies);
        console.log(genres);
        this.genres = genres.genres;
        let template;
        const valueOrPlaceholder = (value, placeholder) => value ? value : placeholder;

        if(movies.results.length > 0){
        template = `
            <div class="movies">
                ${movies.results.map(movie => `
                <div class="movie" data-id="${movie.id}">
                    <img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path} />
                    <h3> ${valueOrPlaceholder(movie.title, movie.name)}</h3>
                    <time datetime="${valueOrPlaceholder(movie.first_air_date, "")}">${valueOrPlaceholder(movie.first_air_date, "")}</time>
                    <p>Genres: ${movie.genre_ids ? movie.genre_ids.map( genre_id => this.getGenreNamebyId(genre_id) ).join(' ') : ""}</p>
                </div>`
                ).join('')}
            </div>
            ${pagination.renderPagination(movies.total_pages)}
            `;
        }else{
            template = `<p>Sorry, we couldn't find any content</p>`
        }

        const resultContainer = document.querySelector(this.wrapperHTMLSelector);
        resultContainer.innerHTML = template;
    }
}