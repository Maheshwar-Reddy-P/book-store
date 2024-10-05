import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { CommonMessageService } from 'src/app/services/common-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  books: any[] = [];
  searchVal!:any;
  constructor (private _bookService: BookService, private _commonMessage:CommonMessageService) {

  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this._bookService.getBooks()
    .subscribe({
      next:(res:any) => {
        // this._commonMessage.showSuccess(res.message);
        this.books = res.data;
      },
      error:(err) => {          
        this._commonMessage.showError(err.error.message);
      }
    });
  }

  applySearchFilters() {
    let data = {
      "searchVal": this.searchVal
    };

    this._bookService.getSearchResults(data)
    .subscribe({
      next:(res:any) => {
        // this._commonMessage.showSuccess(res.message);
        this.books = res.data;
      },
      error:(err) => {          
        this._commonMessage.showError(err.error.message);
      }
    });
  }
}
