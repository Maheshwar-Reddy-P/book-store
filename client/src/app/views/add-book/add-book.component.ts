import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CommonMessageService } from 'src/app/services/common-message.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  addBookForm!:FormGroup;
  countryOptions!: { label: string; value: string }[];
  

  constructor (
    private fb:FormBuilder,
    private auth:AuthenticationService,
    private router:Router,
    private _commonMessage: CommonMessageService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title: ["",[Validators.required]],
      author: ["",[Validators.required]],
      language: ["",[Validators.required]],
      imageLink: [null,[Validators.required]],
      country: ["",[Validators.required]],
      link: ["",[Validators.required]],
      pages: ["",[Validators.required]],
      year: ["",[Validators.required]],
      price: ["",[Validators.required,Validators.pattern('^[0-9]*$')]],
      description: ["",[Validators.required]],
    });


    this.countryOptions = [
      { label: 'United States', value: 'US' },
      { label: 'Canada', value: 'CA' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Australia', value: 'AU' },
      // Add more countries as needed
    ];
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.addBookForm.patchValue({ imageLink: file });
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' + file.name });
  }

  onSubmit() {
    if (this.addBookForm.valid) {
      let data = this.addBookForm.value;
      console.log(data);
      
      // this.auth.register(data).subscribe({
      //   next:(res) => {
      //     this.registerForm.reset();
      //     this._commonMessage.showSuccess(res.message);
      //     this.router.navigate(['login']);
      //   },
      //   error:(err) => {
      //     this._commonMessage.showError(err.error.message);
      //   }
      // });
    } else {
      this.addBookForm.markAllAsTouched();
    }
  }

}
