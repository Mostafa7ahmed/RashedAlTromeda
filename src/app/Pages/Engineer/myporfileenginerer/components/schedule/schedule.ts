import { Component, effect, inject, signal } from '@angular/core';
import { ScheduleService } from '../../../../../Core/service/schedule';
import { ISchedule } from '../../../../../Core/Interface/iengineer-schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss'
})
export class Schedule {
  private scheduleService = inject(ScheduleService);
  private router = inject(Router);

  days = signal([
    { id: 0, name: 'الأحد' },
    { id: 1, name: 'الإثنين' },
    { id: 2, name: 'الثلاثاء' },
    { id: 3, name: 'الأربعاء' },
    { id: 4, name: 'الخميس' },
    { id: 5, name: 'الجمعة' },
    { id: 6, name: 'السبت' },
  ]);

  holidays = signal<ISchedule[]>([]);

  constructor() {
    effect(() => {
      this.scheduleService.refreshComplaints();
      this.loadSchedule();
    });
  }

  ngOnInit() {
    this.loadSchedule();
  }


  loadSchedule() {
    this.scheduleService.getAllSchedules().subscribe({
      next: (res) => {
        if (res?.result?.length) {
          this.holidays.set(res.result);
        }
      },
      error: (err) => console.error('Error fetching schedule:', err)
    });
  }
  openPopup() {
    this.router.navigate(['/engineer', { outlets: { popup: ['addschedule'] } }]);

  }
  isHoliday(dayId: number): boolean {
    return this.holidays().some((d) => d.dayOfWeek === dayId);
  }
    getScheduleForDay(dayId: number): ISchedule | undefined {
    return this.holidays().find((d) => d.dayOfWeek === dayId);
  }
}
