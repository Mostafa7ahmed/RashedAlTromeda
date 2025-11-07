import { IBooking } from './../../../../../Core/Interface/ibooking';
import { Component, inject, signal } from '@angular/core';
import { Booking } from '../../../../../Core/service/Customer/booking';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-bookings',
  imports: [DatePipe , CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class Bookings {
 dropdownOpen = false;
  private _booking = inject(Booking);
 baseUrl = environment.baseUrl;
  bookingCard = signal<IBooking[]>([]);
  selectedStatus = signal<{ code: number; name: string; color: string }>({
    code: -1,
    name: 'جميع الحالات',
    color: '#b6d83bff'
  });

  status = [
    { code: -1, name: 'جميع الحالات', color: '#b6d83bff' },
    { code: 0, name: 'قيد الانتظار', color: '#F36B14' },
    { code: 1, name: 'يتم العمل عليه', color: '#949292' },
    { code: 2, name: 'مكتمل', color: '#6EC733' },
    { code: 3, name: 'تم الإلغاء', color: '#FF4F4F' }
  ];

  constructor() {
    // تحميل البيانات عند فتح الصفحة
    this.loadBookings();
  }

  loadBookings() {
      const statusCode = this.selectedStatus().code === -1 ? null : this.selectedStatus().code;

    this._booking
      .getBooking(1, 100,statusCode)
      .subscribe((res) => {
        this.bookingCard.set(res.result);
      });
  }

  selectStatus(status: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedStatus.set(status);
    this.dropdownOpen = false;
    this.loadBookings(); // تحميل حسب الحالة الجديدة
  }
}
