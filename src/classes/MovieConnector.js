export default class MovieConnector{
    constructor(){
        this.api_key = "1c5abaaeaa13c66b570ad3042a0d51f";
    }

    async fetchMovies(title, page){
        try{
            const response = await fetch("https://api.themoviedb.org/3/search/multi?api_key="+this.api_key+"4&language=en-US&query="+encodeURI(title)+"&page="+encodeURI(page));
            return await response.json()
        }catch(error){
            console.log(error)
            alert("Server error, please try again")
        }
    }

    async fetchDetails(movieId){
        try{
            const response = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+this.api_key+"4&language=en-US")
            return await response.json()
        }catch(error){
            console.log(error)
            alert("Server error, please try again")
        }
    }

    async fetchGenres(){
        try{
            const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+this.api_key+"4&language=en-US")
            return await response.json()
        }catch(error){
            console.log(error)
            alert("Server error, please try again")
        }
    }
}