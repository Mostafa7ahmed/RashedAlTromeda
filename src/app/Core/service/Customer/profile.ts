import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileCustomer, UpdateProfile } from '../../Interface/iprofile-customer';

@Injectable({
  providedIn: 'root'
})
export class Profile {
      private readonly API_URL = `${environment.apiUrl}`; 
      private _http = inject(HttpClient);

      getProfile() :Observable<IResponseOf<IProfileCustomer>> {
        return this._http.get<IResponseOf<IProfileCustomer>>(`${this.API_URL}customer/profile`);
      }
      updateProfile(profileData: UpdateProfile): Observable<IResponseOf<UpdateProfile>> {
        return this._http.put<IResponseOf<UpdateProfile>>(
          `${this.API_URL}customer/profile`,
          profileData
        );
      }

  
}
