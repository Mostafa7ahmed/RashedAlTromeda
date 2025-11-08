import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookingRequest } from '../Interface/ibooking-request';
import { IBookingResponse } from '../Interface/ibooking';

@Injectable({
  providedIn: 'root'
})
export class Booking {
    private baseUrl = `${environment.apiUrl}Booking`; // 🔹 غيّر الـ route حسب الـ API الحقيقي
  private bookingUrl: string = `${environment.apiUrl}booking`; // URL لجلب حجز واحد

  constructor(private http: HttpClient) {}

  createBooking(body: IBookingRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}`, body);
  }


   getBookingById(id: number): Observable<IBookingResponse> {
      return this.http.get<IBookingResponse>(`${this.bookingUrl}?id=${id}`);
    }
  
}
