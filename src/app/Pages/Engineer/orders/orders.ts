import { BookApproved, IBooking } from './../../../Core/Interface/ibooking';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingEngineer } from '../../../Core/service/engineer/bookingengineer';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  imports: [CommonModule , DatePipe , TranslatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders  implements OnInit{
  private _booking = inject(BookingEngineer);
  bookingCard = signal<IBooking[]>([]);
  isLoading = signal(false);

  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading.set(true);
    this._booking.getBooking(1, 1000, 0).subscribe({
      next: (res) => this.bookingCard.set(res.result),
      error: (err) => console.error(err),
      complete: () => this.isLoading.set(false)
    });
  }

  acceptBooking(booking: IBooking) {
    this._booking.updateBookingStatus(booking.id, booking.userId, 1).subscribe({
      next: (res) => {
        console.log('Accepted', res);
        this.bookingCard.update((cards) => cards.filter(b => b.id !== booking.id));

      },
      error: (err) => console.error(err)
    });
  }

  rejectBooking(booking: IBooking) {
    this._booking.updateBookingStatus(booking.id, booking.userId, 3).subscribe({
      next: (res) => {
        console.log('Rejected', res);
            this.bookingCard.update((cards) => cards.filter(b => b.id !== booking.id));

      },
      error: (err) => console.error(err)
    });
  }

}
