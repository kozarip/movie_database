export default class MovieConnector{
    constructor(){
        this.api_key = "1c5abaaeaa13c66b570ad3042a0d51f4";
        this.link = "https://api.themoviedb.org/3/";
    }

    async fetchFromServer(url){
        const response = await fetch(url)
        return await response.json()
    }
}