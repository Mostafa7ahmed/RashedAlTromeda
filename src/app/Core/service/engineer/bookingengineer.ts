import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse } from '../../../Shared/Interface/iresonse';
import { BookApproved, IBooking } from '../../Interface/ibooking';

@Injectable({
  providedIn: 'root'
})
export class BookingEngineer {
     private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}booking/paginate`;
  private bookingUrl: string = `${environment.apiUrl}booking`;

  getBooking(
    pageIndex = 1,
    pageSize = 10,
    status: number | null = null
  ): Observable<IPaginationResponse<IBooking>> {
    let url = `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    if (status !== null) {
      url += `&status=${status}`;
    }
    return this._http.get<IPaginationResponse<IBooking>>(url);
  }

  updateBookingStatus(id: number, userId: number, status: number): Observable<string> {
    const body = { id, userId, status };
    return this._http.put<string>(this.bookingUrl, body, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain' }
    });
  }
}
