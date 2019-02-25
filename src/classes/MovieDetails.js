export default class MovieDetails{
    constructor(wrapperHTMLSelector){
        this.wrapperHTMLSelector = wrapperHTMLSelector;
    }

    renderDetails(details){
        console.log(details);
        const valueOrPlaceholder = (value, placeholder) => value ? value : placeholder;
        const template = `
            <div>
                <img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2${details.poster_path} />
                <h2>${valueOrPlaceholder(details.title, details.name)}</h2>
                <table>
                    <tr>
                        <td>Genres</td>
                        <td>${details.genres ? details.genres.map(genre => genre.name) : ""}</td>
                    </tr>
                    <tr>
                        <td>Production countries</td>
                        <td>${details.production_countries ? details.production_countries.map(production_country => production_country.name): ""}</td>
                    </tr>
                    <tr>
                        <td>Release date</td>
                        <td datetime="${details.release_date}">${valueOrPlaceholder(details.release_date, "")}</td>
                    </tr>
                    <tr>
                        <td>Runtime</td>
                        <td>${valueOrPlaceholder(details.runtime, "")} min</td>
                    </tr>
                    <tr>
                        <td>IMDB</td>
                        <td>${ details.imdb_id ? `<a href="http://imdb.com//title/${details.imdb_id}">Link</a>` : ""}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>${valueOrPlaceholder(details.overview, "")}</td>
                    </tr>
                </table>
            </div>
        `;

        const resultContainer = document.querySelector(this.wrapperHTMLSelector);
        resultContainer.innerHTML = template;
    }
}