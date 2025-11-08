import { Component, inject, signal } from '@angular/core';
import { ReactiveModeuls } from '../../../../../../Shared/Modules/ReactiveForms.module';
import { ISchedule } from '../../../../../../Core/Interface/iengineer-schedule';
import { ScheduleService } from '../../../../../../Core/service/schedule';
import { Router } from '@angular/router';
import { SweetAlert } from '../../../../../../Core/service/sweet-alert';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addschedule',
  imports: [ReactiveModeuls , TranslatePipe] ,
  templateUrl: './addschedule.html',
  styleUrls: ['./addschedule.scss', '../../../../../../Shared/CSS/popup.scss']
})
export class Addschedule {
   private scheduleService = inject(ScheduleService);
  private router = inject(Router);
  private _alert = inject(SweetAlert);
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
  isPopupOpen = false;

  newSchedule: Partial<ISchedule> = {
    dayOfWeek: 0,
    startTime: '',
    endTime: '',
  };

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.router.navigate(['/engineer', { outlets: { popup: null } }]);
  }

  selectDay(id: number) {
    this.newSchedule.dayOfWeek = id;
  }

  addSchedule() {
    const startTime = this.newSchedule.startTime?.length === 5
      ? `${this.newSchedule.startTime}:00`
      : this.newSchedule.startTime;

    const endTime = this.newSchedule.endTime?.length === 5
      ? `${this.newSchedule.endTime}:00`
      : this.newSchedule.endTime;

    const payload = {
      schedules: [
        {
          dayOfWeek: this.newSchedule.dayOfWeek,
          startTime,
          endTime
        }
      ]
    };

    this.scheduleService.addSchedule(payload).subscribe({
      next: (res) => {
        this._alert.toast(res.message || 'تمت إضافة الجدول بنجاح', 'success');
        this.scheduleService.notifyRefresh();
        this.closePopup();
      },
      error: (err) => {
        console.error(err.error.message, err);
        this._alert.toast(err.error.message, 'error');
      },
    });
  }
}
