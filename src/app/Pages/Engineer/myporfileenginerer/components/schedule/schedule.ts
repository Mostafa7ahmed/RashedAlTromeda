import { Component, effect, inject, signal } from '@angular/core';
import { ScheduleService } from '../../../../../Core/service/schedule';
import { ISchedule } from '../../../../../Core/Interface/iengineer-schedule';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule',
  imports: [TranslatePipe],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss'
})
export class Schedule {
  private scheduleService = inject(ScheduleService);
  private router = inject(Router);
  private translate = inject(TranslateService);

days = signal([
  { id: 0, key: 'SUNDAY' },
  { id: 1, key: 'MONDAY' },
  { id: 2, key: 'TUESDAY' },
  { id: 3, key: 'WEDNESDAY' },
  { id: 4, key: 'THURSDAY' },
  { id: 5, key: 'FRIDAY' },
  { id: 6, key: 'SATURDAY' },
]);
getDayName(dayOfWeek: number): string {
  const dayKeys = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const key = dayKeys[dayOfWeek] || '';
  return key ? this.translate.instant(key) : '';
}
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
