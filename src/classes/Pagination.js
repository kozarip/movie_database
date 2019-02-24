import { isArray } from "util";

export default class Pagination{
    constructor(currentPage = 1){
        this.currentPage = currentPage
    }

    setCurrentPage(currentPageNumber){
        if(currentPageNumber && !isNaN(currentPageNumber)){
            this.currentPage = parseInt(currentPageNumber);
        }
    }

    selectPaginationNumbers(allPageNumber){
        const paginations = [];
        const minPageNumber = Math.max(1, (this.currentPage -5));
        const maxPageNumber = Math.min(allPageNumber, (this.currentPage + 5))
        for(let i = minPageNumber; i <= maxPageNumber; i++){
            paginations.push(i);
        }
        return paginations;
    }

    renderPagination(allPageNumber){
        let paginationNumbers = allPageNumber
        if(!isArray(paginationNumbers)){
            paginationNumbers = this.selectPaginationNumbers(allPageNumber);
        }
        return `
        <div class="pagination">
            ${paginationNumbers.map(number => `<a class="pageNumber ${number == this.currentPage ? "current" : ""}">${number}</a>`).join('')
            }
        </div>        
        `
    }
}