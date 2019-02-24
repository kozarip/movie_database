export default class SearchMovies{
    constructor(wrapperHTMLSelector){
        this.wrapperHTMLSelector = wrapperHTMLSelector;
    }

    fetchDetails(movieId){
        fetch("https://api.themoviedb.org/3/movie/"+movieId+"?api_key=1c5abaaeaa13c66b570ad3042a0d51f4&language=en-US")
        .then(response => response.json())
        .then(json => {
            this.renderDetailsDialog(json)
        })
        .catch(error => {
            console.log(error);
            alert("Sorry, there are no results for your search");
        });
    }

    renderDetailsDialog(details){
        console.log(details);
        const template = `
        <div class="dialogWrapper">
            <div class="dialog">
                <a onclick="document.getElementById('dialogContainer').innerHTML=''" class="closeDialog">X</a>
                <img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2${details.poster_path} />
                <h2>${details.title ? details.title : details.name}</h2>
                <table>
                    <tr>
                        <td>Genres</td>
                        <td>${details.genres.map(genre => genre.name)}</td>
                    </tr>
                    <tr>
                        <td>Production countries</td>
                        <td>${details.production_countries.map(production_country => production_country.name)}</td>
                    </tr>
                    <tr>
                        <td>Release date</td>
                        <td datetime="${details.release_date}">${details.release_date}</td>
                    </tr>
                    <tr>
                        <td>Runtime</td>
                        <td>${details.runtime} min</td>
                    </tr>
                    <tr>
                        <td>IMDB</td>
                        <td href="http://imdb.com//title/${details.imdb_id}">Link</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>${details.overview}</td>
                    </tr>
                </table>
            </div>
        </div>
        `;

        const resultContainer = document.querySelector(this.wrapperHTMLSelector);
        resultContainer.innerHTML = template;
    }
}