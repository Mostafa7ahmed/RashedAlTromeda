import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileCustomer } from '../../Interface/iprofile-customer';

@Injectable({
  providedIn: 'root'
})
export class Profile {
      private readonly API_URL = `${environment.apiUrl}`; 
      private _http = inject(HttpClient);

      getProfile() :Observable<IResponseOf<IProfileCustomer>> {
        return this._http.get<IResponseOf<IProfileCustomer>>(`${this.API_URL}customer/profile`);
      }

  
}
