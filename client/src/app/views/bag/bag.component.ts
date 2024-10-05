import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CommonMessageService } from 'src/app/services/common-message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit{

  cartBooks: any[] = [];
  isCartEmpty: boolean = true;
  totalPrice!:number;
  quantity: any[] = [{"label":1,"code":1},{"label":2,"code":2}];

  constructor(private _cartService: CartService,
              private _commonMessage: CommonMessageService,
              private _orderService: OrderService,
              private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    var userId = localStorage.getItem('user_id');
    let data = {
      userId: userId
    };
    this._cartService.getCartItems(data)
    .subscribe({
      next:(res:any) => {
        this.cartBooks = res.data.items;
        if (this.cartBooks.length > 0) {
          this.isCartEmpty = false
        }
        let booksPrice = 0;
        this.cartBooks.map((book:any) => {
          booksPrice += book.totalPrice;
        })
        this.totalPrice = booksPrice;
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message);
      }
    });

  }

  updateTotalPrice(newQuantity:number, bookId:string) {
    const userId = localStorage.getItem('user_id');
    let data = {
      newQuantity,
      bookId,
      userId
    };
    
    this._cartService.updateQuantity(data)
    .subscribe({
      next:(res:any) => {
        this.getCartItems();
        this._commonMessage.showSuccess(res.message);
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message)
      }
    })
  }

  placeOrder() {
    const userId = localStorage.getItem('user_id');
    let data = {
      userId
    };
    
    this._orderService.placeOrder(data)
    .subscribe({
      next:(res:any) => {
        this.router.navigate(['order-confirmation']);
        this._commonMessage.showSuccess(res.message);
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message)
      }
    })
  }

  removeItem(bookId:any) {
    const userId = localStorage.getItem('user_id');
    let data = {
      bookId,
      userId
    };
    
    this._cartService.removeCartItem(data)
    .subscribe({
      next:(res:any) => {
        this.getCartItems();
        this._commonMessage.showSuccess(res.message);
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message)
      }
    })
  }

}