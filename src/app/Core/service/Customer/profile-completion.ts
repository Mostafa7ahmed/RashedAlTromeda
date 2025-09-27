import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileCompletion } from '../../Interface/customer';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletion {
    private readonly API_URL = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  ProfileCompletion(ProfileCompletion :IProfileCompletion): Observable<any> {
    return this.http.post(`${this.API_URL}customer/profile/completion`, ProfileCompletion);
  }
}
