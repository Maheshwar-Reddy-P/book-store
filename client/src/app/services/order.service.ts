import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  placeOrder(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/place-order`,data);
  }

  getOrderItems(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/get-orders`, data);
  }

  buyNow(data:any) {
    return this.http.post(`${this.apiUrl}/api/books/buy-now`,data);
  }
}
