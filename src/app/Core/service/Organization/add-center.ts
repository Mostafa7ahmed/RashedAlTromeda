import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddCenter  } from '../../Interface/iprofile-organization';
import { IResponse } from '../../../Shared/Interface/iresonse';

@Injectable({
  providedIn: 'root'
})
export class AddCenter {
      private readonly API_URL = `${environment.apiUrl}center`; 

  constructor(private http: HttpClient) {}


    addCenter(centerData: IAddCenter ): Observable<IResponse> {


    return this.http.post<IResponse>(this.API_URL, centerData);
  }
}
