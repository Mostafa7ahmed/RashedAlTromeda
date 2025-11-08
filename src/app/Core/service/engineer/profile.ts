import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileEngineer , UpdateProfileEngineer } from '../../Interface/iprofile-engineer';

@Injectable({
  providedIn: 'root'
})
export class ProfileEngineerService {
      private readonly API_URL = `${environment.apiUrl}`; 
      private _http = inject(HttpClient);
  refreshComplaints = signal(false);
  
  notifyRefresh() {
    this.refreshComplaints.set(!this.refreshComplaints());
  }
      getProfile() :Observable<IResponseOf<IProfileEngineer>> {
        return this._http.get<IResponseOf<IProfileEngineer>>(`${this.API_URL}engineer/profile`);
      }
      updateProfile(profileData: UpdateProfileEngineer): Observable<IResponseOf<UpdateProfileEngineer>> {
        return this._http.put<IResponseOf<UpdateProfileEngineer>>(
          `${this.API_URL}engineer/profile`,
          profileData
        );
      }

  
}
