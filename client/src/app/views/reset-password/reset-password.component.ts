import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from 'primeng/password';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonMessageService } from 'src/app/services/common-message.service';
import { confirmPasswordValidator } from 'src/app/Validators/confirm-password.validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;
  token!:string;

  constructor (private fb:FormBuilder, private activatedRouter: ActivatedRoute, private router: Router, private _authService: AuthenticationService, private _commonMessage: CommonMessageService) {

  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ["",[Validators.required,Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ["", [Validators.required]]
    },
    {
      validator: confirmPasswordValidator('password','confirmPassword')
    }
  )

    this.activatedRouter.params.subscribe(val => {
      this.token = val['token'];
    })    
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let resetData = {
        token: this.token,
        password: this.resetPasswordForm.value.password
      }
      this._authService.resetPassword(resetData).subscribe({
        next:(res) => {
          this.resetPasswordForm.reset();
          // this._commonMessage.showSuccess(res.message);
          this._commonMessage.showSuccess("Success");
          this.router.navigate(['login']);
        },
        error:(err) => {          
          this._commonMessage.showError(err.error.message);
        }
      });
      console.log(this.resetPasswordForm.value);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }

  }

  cancelForm() {

  }
}
