import { Component, signal } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { IBookingDetail } from '../../../Core/Interface/ibooking';
import { Booking } from '../../../Core/service/booking';
import { environment } from '../../../../environments/environment';
import { ShortenPipe } from '../../../Shared/pipes/shorten-pipe';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order-detials',
  imports: [HeaderPages , TranslatePipe , DatePipe],
  templateUrl: './order-detials.html',
  styleUrl: './order-detials.scss'
})
export class OrderDetials {
 bookingId = 66; // ممكن تجيبها من route param
  bookingData = signal<IBookingDetail | null>(null);
  isLoading = false;
  errorMessage = '';
 baseUrl =environment.baseUrl
  constructor(private bookingService: Booking) {}

  ngOnInit(): void {
    this.getBooking();
  }

  getBooking() {
    this.isLoading = true;
    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (res) => {
        if (res.success) {
          this.bookingData.set(  res.result);
          
        } else {
          this.errorMessage = 'فشل جلب بيانات الحجز';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء الاتصال بالخادم';
        this.isLoading = false;
      }
    });
  }
}
