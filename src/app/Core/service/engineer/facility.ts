import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPaginationResponse } from '../../../Shared/Interface/iresonse';
import { Observable } from 'rxjs';
import { IFacility } from '../../Interface/ifacility';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Facility {
  

       private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}facility`;


    getFacilities(centerId: number, facilityType = 0, pageIndex = 1, pageSize = 50): Observable<IPaginationResponse<IFacility>> {
    const params = new HttpParams()
      .set('centerId', centerId)
      .set('facilityType', facilityType)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    return this._http.get<IPaginationResponse<IFacility>>(`${this.baseUrl}/paginate`, { params });
  }
}
