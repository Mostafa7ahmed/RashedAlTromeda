import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { IEngineerSchedule, ISchedule } from '../Interface/iengineer-schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
 
    private _http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}schedule`;
  refreshComplaints = signal(false);
  
  notifyRefresh() {
    this.refreshComplaints.set(!this.refreshComplaints());
  }
    getScheduleByEngineer(engineerId: number):Observable<IResponseOf<IEngineerSchedule[]>> {
      const url = `${this.baseUrl}?userId=${engineerId}`;
      return this._http.get<IResponseOf<IEngineerSchedule[]>>(url);
    }

    getAllSchedules():Observable<IResponseOf<ISchedule[]>> {
      return this._http.get<IResponseOf<ISchedule[]>>(`${this.baseUrl}/getall`);
    }

   addSchedule(data: any) :Observable<IResponseOf<ISchedule[]>>  {
    return this._http.post<IResponseOf<ISchedule[]>>(`${this.baseUrl}`, data);
  }

}
