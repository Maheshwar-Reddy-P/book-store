import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CommonMessageService } from '../services/common-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor (private fb:FormBuilder,
               private auth:AuthenticationService,
               private _commonMessage: CommonMessageService,
              private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginData = this.loginForm.value;
      this.auth.login(loginData).subscribe({
        next:(res) => {          
          localStorage.setItem("user_id",res.data._id);
          this.auth.isLoggedIn$.next(true);
          this.loginForm.reset();
          this._commonMessage.showSuccess(res.message);
          this.router.navigate(['home']);
        },
        error:(err) => {          
          this._commonMessage.showError(err.error.message);
        }
      });
      //   response => {
      //     console.log(response);
      //     console.log("Login Success");
      //     if (response.status == 200) {
      //       this._commonMessage.showSuccess(response.message);
      //     } else {
      //       console.log("Mahesh");
            
      //       this._commonMessage.showError(response.message);
      //     }
      //   }
      // );
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
