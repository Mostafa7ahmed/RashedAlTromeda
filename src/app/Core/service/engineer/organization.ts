import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse , IResponseOf } from '../../../Shared/Interface/iresonse';
import { BookApproved, IBooking } from '../../Interface/ibooking';
import { IOrganization , IOrganizationResponse } from '../../Interface/iorganization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationEngineer {
     private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}organization`;
  private bookingUrl: string = `${environment.apiUrl}booking`;

  getOrganization(
    pageIndex = 1,
    pageSize = 10,
    search = '',
  ): Observable<IPaginationResponse<IOrganization>> {
    const url = `${this.baseUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;

    return this._http.get<IPaginationResponse<IOrganization>>(url);
  }

    getOneOrganization(id: number): Observable<IResponseOf<IOrganizationResponse>> {
    return this._http.get<IResponseOf<IOrganizationResponse>>(`${this.baseUrl}?id=${id}`);
  }

}
