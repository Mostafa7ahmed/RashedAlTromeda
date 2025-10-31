import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { IEngineerSchedule } from '../Interface/iengineer-schedule';

@Injectable({
  providedIn: 'root'
})
export class Schedule {
 
    private _http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}schedule`;

    getScheduleByEngineer(engineerId: number):Observable<IResponseOf<IEngineerSchedule[]>> {
      const url = `${this.baseUrl}?userId=${engineerId}`;
      return this._http.get<IResponseOf<IEngineerSchedule[]>>(url);
    }

}
