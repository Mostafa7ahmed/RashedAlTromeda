import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse, IPaginationResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { IEngineerSchedule } from '../Interface/iengineer-schedule';
import { IAddRate, IRate } from '../Interface/irate';

@Injectable({
  providedIn: 'root'
})
export class Rate {
   
    private _http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}rating/paginate`;
  private addUrl: string = `${environment.apiUrl}rating`;

    getRateByEngineer(engineerId: number):Observable<IPaginationResponse<IRate>> {
      const url = `${this.baseUrl}?engineerId=${engineerId}&sortDirection=0`;
      return this._http.get<IPaginationResponse<IRate>>(url);
    }
      addRate(payload:IAddRate): Observable<IResponseOf<IRate>> {
    return this._http.post<IResponseOf<IRate>>(this.addUrl, payload);
  }
}
