import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { IProfileCompletion } from '../../Interface/customer';
import { UpdataOrganization } from '../../Interface/iprofile-organization';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletion {
    private readonly API_URL = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

ProfileCompletion(ProfileCompletion: UpdataOrganization): Observable<any> {
  const token = localStorage.getItem('auth_token_map'); // أو من أي مكان بتحفظ فيه التوكن
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.put(
    `${this.API_URL}organization/profile/completion`,
    ProfileCompletion,
    { headers }
  );
}
}
