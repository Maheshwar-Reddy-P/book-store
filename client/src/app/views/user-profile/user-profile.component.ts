import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonMessageService } from 'src/app/services/common-message.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user: any = {}; // Replace with your User model if you have one
  isDropdownVisible: boolean = false;

  constructor(private _authService: AuthenticationService,
              private _commonMessage: CommonMessageService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    const data = {
      userId
    }
    this._authService.getUserDetails(data)
    .subscribe({
      next:(res:any) => {
        this.user = res.data;
        console.log(this.user);
        
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message);
      }
    });
    
  }
  
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    const userId = localStorage.getItem('user_id');
    const data = {
      userId
    }
    this._authService.getUserDetails(data)
    .subscribe({
      next:(res:any) => {
        this.user = res.data;
        console.log(this.user);
        
      },
      error:(err) => {
        this._commonMessage.showError(err.error.message);
      }
    });
  }
  
  logout () {

  }
  
}
