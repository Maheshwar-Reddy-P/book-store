import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonMessageService } from 'src/app/services/common-message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  bookId!:string;
  bookDetails!: any;
  bookExistsInCart: boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
              private _bookService: BookService,
              private _commonMessage: CommonMessageService,
              private _cartService: CartService,
              private router: Router,
              private _orderService: OrderService) {

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(val => {
      this.bookId = val['id'];
    });
    const userId = localStorage.getItem('user_id');
    let data = {
      'userId': userId,
      'bookId': this.bookId
    }
    this._bookService.getBookDetails(data)
    .subscribe({
      next:(res:any) => {
        this.bookDetails = res.data.bookDetails[0];
        this.bookExistsInCart = res.data.bookExistsInCart;
                
      },
      error:(err) => {          
        this._commonMessage.showError(err.error.message);
      }
    });
  }

  addToBag(bookId:any) {
    var userId = localStorage.getItem('user_id');
    let data = {
      'userId': userId,
      'bookId': bookId
    }
    this._cartService.addToCart(data)
    .subscribe({
      next:(res:any) => {
        this._commonMessage.showSuccess(res.message);
        this.router.navigate(['bag']);
      },
      error:(err) => {          
        this._commonMessage.showError(err.error.message);
      }
    });
  }
  
  buyNow(bookId:any) {
    var userId = localStorage.getItem('user_id');
    let data = {
      'userId': userId,
      'bookId': bookId
    }
    this._orderService.buyNow(data)
    .subscribe({
      next:(res:any) => {
        this._commonMessage.showSuccess(res.message);
        this.router.navigate(['order-confirmation']);
      },
      error:(err) => {          
        this._commonMessage.showError(err.error.message);
      }
    });
  }

}
