import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileEngineer , UpdateProfileEngineer } from '../../Interface/iprofile-engineer';
import { IProfileOrganization, UpdataCenter, UpdataOrganization } from '../../Interface/iprofile-organization';
import { ICenter } from '../../Interface/iorganization';

@Injectable({
  providedIn: 'root'
})
export class ProfileCenterService {
      private readonly API_URL = `${environment.apiUrl}`; 
      private _http = inject(HttpClient);

      getProfile() :Observable<IResponseOf<ICenter>> {
        return this._http.get<IResponseOf<ICenter>>(`${this.API_URL}center/profile`);
      }
      updateProfile(profileData: UpdataCenter): Observable<IResponseOf<UpdataCenter>> {
        return this._http.put<IResponseOf<UpdataCenter>>(
          `${this.API_URL}center`,
          profileData
        );
      }

  
}
