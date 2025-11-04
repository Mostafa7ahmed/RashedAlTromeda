import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangePassword } from '../Interface/idecode';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdatePassword {
 
    private baseUrl: string = `${environment.apiUrl}`;
  

    constructor(private http: HttpClient) {}

  updatePassword(body: IChangePassword): Observable<any> {
    return this.http.put(`${this.baseUrl}user/password`, body);
  }
}
