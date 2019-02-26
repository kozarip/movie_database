export default class MovieConnector{
    constructor(){
        this.api_key = "1c5abaaeaa13c66b570ad3042a0d51f4";
        this.link = "https://api.themoviedb.org/3/";
    }

    async fetchMovies(movieTitle,  page){
        return this.fetchFromServer(this.link+"search/multi?api_key="+this.api_key+"&language=en-US&query="+encodeURI(movieTitle)+"&page="+page);
    }

    async fetcDetails(movieTitle){
        return this.fetchFromServer(this.link+"movie/"+movieTitle+"?api_key="+this.api_key+"&language=en-US");
    }

    async fetchGenres(){
        return this.fetchFromServer(this.link+"genre/movie/list?api_key="+this.api_key+"&language=en-US");
    }

    async fetchFromServer(url){
        const response = await fetch(url)
        return await response.json()
    }
}