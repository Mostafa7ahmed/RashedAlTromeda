import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDecode } from '../Interface/idecode';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = `${environment.apiUrl}`; 
  private router = inject(Router);
  constructor(private http: HttpClient) {}

  login(credentials: { phone: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}user/session`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  decodeToken(): IDecode | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<IDecode>(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  getUser(): any {
    const decoded = this.decodeToken();
    return decoded ? decoded : null;
  }

  isLoggedIn(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return false;

    const expiry = decoded.exp * 1000;
    return Date.now() < expiry;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/selectType']);
  }
}
