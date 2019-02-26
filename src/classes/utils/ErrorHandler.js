export default class ErrorHandler{
    constructor(errorHTMLWrapper){
        this.errorHTMLWrapper = errorHTMLWrapper;
    }

    handle(error){
        this.logError(error)
        this.showMessageToUser(error);
    }

    showMessageToUser(error){
        let errorMessage = "";
        if(typeof error == "string"){
            errorMessage = error;
        }
        else if(error.status_message){
            errorMessage = error.status_message
        }else{
            errorMessage = "Sorry, we have an error. Please try again later."
        }

        const resultContainer = document.querySelector(this.errorHTMLWrapper);
        resultContainer.innerHTML = errorMessage;
    }

    logError(error){
        console.log(error)
    }
}