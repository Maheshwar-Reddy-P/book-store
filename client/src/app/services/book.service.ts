import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getBooks() {
    return this.http.get(`${this.apiUrl}/api/books/`);
  }

  getBookDetails(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/book-details`,data);
  }

  getSearchResults(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/search-results`,data);
  }
}
