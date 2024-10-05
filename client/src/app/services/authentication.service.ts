import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  login (data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`,data);
  }

  register (data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`,data);
  }

  sendEmail (data:any) {
    return this.http.post(`${this.apiUrl}/api/auth/send-email`, data);
  }

  resetPassword (data:any) {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, data);
  }

  getUserDetails (data:any) {
    return this.http.post(`${this.apiUrl}/api/auth/user-details`, data);
  }

  isLoggedIn () {
    return !!localStorage.getItem('user_id');
  }
  
}
