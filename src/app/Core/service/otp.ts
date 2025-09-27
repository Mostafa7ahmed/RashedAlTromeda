import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Otpservice {
  private readonly API_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  OTPFun(body: { phone: string; type: number }): Observable<any> {
    return this.http.post(`${this.API_URL}otp`, body);
  }
  verifyOtp(body: { token: string; code: string }): Observable<any> {
    return this.http.put(`${this.API_URL}otp`, body);
  }


}
