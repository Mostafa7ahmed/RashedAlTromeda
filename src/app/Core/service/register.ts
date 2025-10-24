import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../Interface/customer';

@Injectable({
  providedIn: 'root'
})
export class Register {
   private readonly API_URL = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${this.API_URL}customer`, customer);
  }

  createEngineer(engineer: any): Observable<any> {
    return this.http.post(`${this.API_URL}engineer`, engineer);
  }

  createOrganization(org: any): Observable<any> {
    return this.http.post(`${this.API_URL}organization`, org);
  }
}
