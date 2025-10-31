import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { IEngineer, IEngineerProfile } from '../Interface/iengineer';

@Injectable({
  providedIn: 'root'
})
export class Engineer {
  private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}engineer/paginate`;

  getEngineerList(
    pageIndex = 1,
    pageSize = 10,
    serviceId: number = 0,

  ): Observable<IPaginationResponse<IEngineer>> {
    const url = `${this.baseUrl}?serviceId=${serviceId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get<IPaginationResponse<IEngineer>>(url);
  }

  getProfileEngineer(engineerId: number): Observable<IResponseOf<IEngineerProfile>> {
    const url = `${environment.apiUrl}engineer?id=${engineerId}`;
    return this._http.get<IResponseOf<IEngineerProfile>>(url);
  }
}
