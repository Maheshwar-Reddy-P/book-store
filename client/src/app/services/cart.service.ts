import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  addToCart(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/add-to-bag`,data);
  }

  getCartItems(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/get-bag`,data);
  }

  updateQuantity(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/update-quantity`,data);
  }

  removeCartItem(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/remove-bag-item`,data);
  }
}
