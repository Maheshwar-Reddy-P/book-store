import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { confirmPasswordValidator } from '../Validators/confirm-password.validators';
import { Router } from '@angular/router';
import { CommonMessageService } from '../services/common-message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;

  constructor(private fb:FormBuilder,
              private auth:AuthenticationService,
              private router:Router,
              private _commonMessage: CommonMessageService
            ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ["",[Validators.required]],
      lastName: ["",[Validators.required]],
      username: ["",[Validators.required]],
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required,
                    Validators.minLength(8),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
                ]],
      confirmPassword: ["",[Validators.required]]
    },
    {
      validator: confirmPasswordValidator('password','confirmPassword')
    }
    )
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let data = this.registerForm.value;
      this.auth.register(data).subscribe({
        next:(res) => {
          this.registerForm.reset();
          this._commonMessage.showSuccess(res.message);
          this.router.navigate(['login']);
        },
        error:(err) => {
          this._commonMessage.showError(err.error.message);
        }
      });
      //   response => {
      //     console.log(response);
      //     alert("Register Success");
      //     this.registerForm.reset();
      //     this.router.navigate(['login']);
      //   }
      // );
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
