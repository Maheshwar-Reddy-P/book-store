import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { authGuard } from './auth.guard';
import { BookDetailsComponent } from './views/book-details/book-details.component';
import { BagComponent } from './views/bag/bag.component';
import { OrderComponent } from './views/order/order.component';
import { AddBookComponent } from './views/add-book/add-book.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'reset/:token', component: ResetPasswordComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'book/:id', component: BookDetailsComponent},
  {path: 'bag', component: BagComponent},
  {path: 'my-orders', component: OrderComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'order-confirmation', component: OrderConfirmationComponent},
  // {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
