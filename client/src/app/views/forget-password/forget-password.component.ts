import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonMessageService } from 'src/app/services/common-message.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{

  forgetPasswordForm!: FormGroup;

  constructor (private fb:FormBuilder, private router: Router, private _authService: AuthenticationService, private _commonMessage: CommonMessageService) {

  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ["",[Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    console.log(this.forgetPasswordForm.value);
    if (this.forgetPasswordForm.valid) {
      let data = this.forgetPasswordForm.value;
      this._authService.sendEmail(data).subscribe({
        next:(res) => {
          this.forgetPasswordForm.reset();
          console.log(res);
          
          this._commonMessage.showSuccess("Success");
          // this._commonMessage.showSuccess(res.message);
          // this.router.navigate(['home']);
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
      // console.log(this.loginForm.value);
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
    
  }

  cancelForm() {    
    this.forgetPasswordForm.reset();
    this.router.navigate(["login"]);
  }
}
