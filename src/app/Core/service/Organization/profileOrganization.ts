import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileEngineer , UpdateProfileEngineer } from '../../Interface/iprofile-engineer';
import { IProfileOrganization, UpdataOrganization } from '../../Interface/iprofile-organization';

@Injectable({
  providedIn: 'root'
})
export class ProfileOrganizationService {
      private readonly API_URL = `${environment.apiUrl}`; 
      private _http = inject(HttpClient);

      getProfile() :Observable<IProfileOrganization> {
        return this._http.get<IProfileOrganization>(`${this.API_URL}organization/profile`);
      }
      updateProfile(profileData: UpdataOrganization): Observable<IResponseOf<UpdataOrganization>> {
        return this._http.put<IResponseOf<UpdataOrganization>>(
          `${this.API_URL}organization/profile`,
          profileData
        );
      }

  
}
