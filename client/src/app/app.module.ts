import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './helpers/header/header.component';

import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FooterComponent } from './helpers/footer/footer.component';

// import { FooterModule } from 'primeng/footer';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './views/home/home.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { BookDetailsComponent } from './views/book-details/book-details.component';
import { BagComponent } from './views/bag/bag.component';
import { OrderComponent } from './views/order/order.component';
import { AddBookComponent } from './views/add-book/add-book.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    BookDetailsComponent,
    BagComponent,
    OrderComponent,
    AddBookComponent,
    OrderConfirmationComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule,
    // FooterModule,
    PanelModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    FileUploadModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
