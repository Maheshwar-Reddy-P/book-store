import { Component, OnInit } from '@angular/core';
import { CommonMessageService } from 'src/app/services/common-message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders:any[] = [];
  constructor (private _orderService: OrderService,
               private _commonMessage: CommonMessageService
  ) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList() {
    var userId = localStorage.getItem('user_id');
    let data = {
      userId: userId
    };
    this._orderService.getOrderItems(data)
    .subscribe({
      next:(res:any) => {
        this.orders = res.data;
        console.log(this.orders);
        
        let booksPrice = 0;
        // this.cartBooks.map((book:any) => {
        //   booksPrice += book.totalPrice;
        // })
        // this.totalPrice = booksPrice;
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message);
      }
    });

  }
}
