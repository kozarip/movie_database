export default class SearchMovies{
    constructor(wrapperHTMLSelector){
        this.wrapperHTMLSelector = wrapperHTMLSelector;
        this.fetchGenres().then((genres)=>{
            this.genres = genres.genres;
        })
    }

    async fetchGenres(){
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1c5abaaeaa13c66b570ad3042a0d51f4&language=en-US")
        return await response.json()
    }

    getGenreNamebyId(id){
        const selectedGenre = this.genres.map(genre => genre).filter(genre => genre.id == id)[0]
        if(selectedGenre){
            return selectedGenre.name;
        }
        return "";
    }

    fetchMovies(title, page){
        if(title.length > 2){
            this.title = title;
            this.page = page;
            this.link = "https://api.themoviedb.org/3/search/multi?api_key=1c5abaaeaa13c66b570ad3042a0d51f4&language=en-US&query="+encodeURI(this.title)+"&page="+encodeURI(this.page);
    
            fetch(this.link)
            .then(response => response.json())
            .then(json => {
                this.renderMovies(json)
            })
            .catch(error => {
                console.log(error);
                alert("Sorry, there are no results for your search");
            });
        }
        else{
            alert("Sorry, you need to write at least 3 charachter");
        }
    }

    renderMovies(movies){
        console.log(movies);
        const template = `
            <div class="movies">
                ${movies.results.map(movie => `
                <div class="movie">
                    <img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path} />
                    <details> 
                        <summary> ${movie.title ? movie.title : movie.name}</summary>
                        <time datetime="${movie.first_air_date ? movie.first_air_date : " "}">${movie.first_air_date ? movie.first_air_date : " "}</time>
                        <p>Genres: ${movie.genre_ids.map( genre_id => this.getGenreNamebyId(genre_id) )}</p>
                    </details>
                </div>`
                ).join('')}
            </div>
            ${this.renderPagination(movies.total_pages)}`;

        const resultContainer = document.querySelector(this.wrapperHTMLSelector);
        resultContainer.innerHTML = template;
    }

    renderPagination(allPageNumber){
        const paginations = [];
        for(let i = 0; i < allPageNumber; i++){
            paginations.push(i+1);
        }
        return `
        <div class="pagination">
            ${paginations
                .filter( pagination => (this.page -5) < pagination && pagination < (this.page + 5) )
                .map(pagination => `<a onclick="searcher.fetchMovies(${this.title}, ${pagination})" class="${pagination === this.page ? "current" : ""}">${pagination}</a>`).join('')
            }
        </div>        
        `
    }
}