import { IBooking } from './../../../../../Core/Interface/ibooking';
import { Component, inject, signal } from '@angular/core';
import { Booking } from '../../../../../Core/service/Customer/booking';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-bookings',
  imports: [DatePipe , CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.scss' , '../suggestion/suggestion.scss']
})
export class Bookings  {
  dropdownOpen = false;
  private _booking = inject(Booking);
    currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalCount = signal<number>(0);
  moveNext = signal<boolean>(false);
  movePrevious = signal<boolean>(false);
  pageSize = 4;
  isLoading = signal<boolean>(false);
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
    this.loadBookings();
  }

loadBookings() {
  const statusCode = this.selectedStatus().code === -1 ? null : this.selectedStatus().code;

  this.isLoading.set(true);
  this._booking
    .getBooking(this.currentPage(), this.pageSize, statusCode)
    .subscribe({
      next: (res) => {
        this.bookingCard.set(res.result);
        this.totalPages.set(res.totalPages);
        this.totalCount.set(res.totalCount);
        this.moveNext.set(res.moveNext);
        this.movePrevious.set(res.movePrevious);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
        this.isLoading.set(false);
      }
    });
}
nextPage() {
  if (this.currentPage() < this.totalPages()) {
    this.currentPage.update(v => v + 1);
    this.loadBookings();
  }
}

prevPage() {
  if (this.currentPage() > 1) {
    this.currentPage.update(v => v - 1);
    this.loadBookings();
  }
}

goToPage(page: number) {
  this.currentPage.set(page);
  this.loadBookings();
}

get visiblePages() {
  const total = this.totalPages();
  const current = this.currentPage();
  const windowSize = 4;

  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - windowSize + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
  selectStatus(status: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedStatus.set(status);
    this.dropdownOpen = false;
    this.loadBookings(); // تحميل حسب الحالة الجديدة
  }
}
