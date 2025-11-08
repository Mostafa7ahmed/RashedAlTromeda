import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPaginationResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { Observable } from 'rxjs';
import { BookingUser, IAddComplaint, IComplaint } from '../Interface/icomplaint';

@Injectable({
  providedIn: 'root'
})
export class Complaint {
    private _http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}complaint/pagiante`;
  refreshComplaints = signal(false);
  
  notifyRefresh() {
    this.refreshComplaints.set(!this.refreshComplaints());
  }
    getComplaint(
      pageIndex = 1,
      pageSize = 10,
        search = '',

  
    ): Observable<IPaginationResponse<IComplaint>> {
      const url = `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;
      return this._http.get<IPaginationResponse<IComplaint>>(url);
    }
  
    AddComplaint(ComplaintData: IAddComplaint): Observable<IResponseOf<IComplaint>> {
      return this._http.post<IResponseOf<IComplaint>>(
        `${environment.apiUrl}complaint`,
        ComplaintData
      );
    } 

    getBooing(): Observable<IResponseOf<BookingUser[]>>{

      return this._http.get<IResponseOf<BookingUser[]>>(`${environment.apiUrl}booking/customers`);

    }
}
