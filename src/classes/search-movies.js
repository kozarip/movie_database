export default class SearchMovies{
    constructor(wrapperHTMLSelector){
        this.wrapperHTMLSelector = wrapperHTMLSelector;
    }

     getMovies(title, page){
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
        const markup = `
            <div class="movies">
                ${movies.results.map(movie => `
                <div class="movie">
                    <img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path} />
                    <details> 
                        <summary> ${movie.title ? movie.title : movie.name}</summary>
                        <p>${movie.first_air_date ? movie.first_air_date : " "}</p>
                    </details>
                </div>`
                ).join('')}
            </div>
            ${this.renderPagination(movies.total_pages)}`;

        const resultContainer = document.querySelector(this.wrapperHTMLSelector);
        resultContainer.innerHTML = markup;
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
                .map(pagination => `<a class="${pagination === this.page ? "current" : ""}">${pagination}</a>`).join('')
            }
        </div>        
        `
        /*document.querySelector(".pagination a").addEventListener("click", ()=>{
            console.log("click");
        })
        return template;*/

    }
}