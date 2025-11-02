import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEngineerProfile, Service } from '../../../Core/Interface/iengineer';
import { IEngineerSchedule } from '../../../Core/Interface/iengineer-schedule';
import { IRate } from '../../../Core/Interface/irate';
import { Engineer } from '../../../Core/service/engineer';
import { ScheduleService } from '../../../Core/service/schedule';
import { Rate } from '../../../Core/service/rate';
import { ExperiencePipe } from '../../../Shared/pipes/experience-pipe';
import { environment } from '../../../../environments/environment';
import { Rates } from './Components/rates/rates';

@Component({
  selector: 'app-worker-profile',
  imports: [CommonModule, ExperiencePipe, Rates ],
  templateUrl: './worker-profile.html',
  styleUrls: ['./worker-profile.scss' , '../../../Shared/CSS/popup.scss'],
})
export class WorkerProfile {
  private _engineerService = inject(Engineer);
  private _route = inject(ActivatedRoute);
  private _scheduleService = inject(ScheduleService);

  // ✅ signals
  engineerProfile = signal<IEngineerProfile | null>(null);
  engineerSchedule = signal<IEngineerSchedule[]>([]);
  engineerRate = signal<IRate[]>([]);
  selectedServices = signal<Service[]>([]);
  selectedDay = signal<number | null>(null);
  userId = signal<number | null>(null);
  engineerId = signal<number | null>(null);
  baseUrl: string = environment.baseUrl;

  totalPrice = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.price, 0)
  );

  ngOnInit() {
    const engineerIdRoute = Number(this._route.snapshot.paramMap.get('profileId'));
    if (!engineerIdRoute) return;
    this.engineerId.set(engineerIdRoute);
    this.loadEngineerProfile(engineerIdRoute);
    this.loadSchedule(engineerIdRoute);
  }

  loadEngineerProfile(id: number) {
    this._engineerService.getProfileEngineer(id).subscribe({
      next: (res) => {
        const profile = res.result;
        this.engineerProfile.set(profile);
        this.userId.set(profile.userDto.id);

      const stored = localStorage.getItem('selectedServices');
      if (stored) {
        const ids: number[] = JSON.parse(stored);
        const selected = res.result.services.filter((s: Service) => ids.includes(s.id));
        this.selectedServices.set(selected);
      }

      const storedServiceId = Number(localStorage.getItem('serviceId'));
      if (storedServiceId) {
        const matched = res.result.services.find((s: Service) => s.id === storedServiceId);
        if (matched && !this.selectedServices().some(s => s.id === matched.id)) {
          this.selectedServices.set([...this.selectedServices(), matched]);
        }
      }
    },
      error: (err) => console.error('❌ خطأ أثناء تحميل بيانات المهندس:', err),
    });
  }

  loadSchedule(engineerId: number) {
    this._scheduleService.getScheduleByEngineer(engineerId).subscribe({
      next: (res) => this.engineerSchedule.set(res.result),
      error: (err) => console.error('❌ خطأ أثناء تحميل الجدول:', err),
    });
  }


  toggleService(service: Service) {
    const current = this.selectedServices();
    const exists = current.some((s) => s.id === service.id);

    const updatedServices = exists
      ? current.filter((s) => s.id !== service.id)
      : [...current, service];

    this.selectedServices.set(updatedServices);

    const serviceIds = updatedServices.map((s) => s.id);
    localStorage.setItem('selectedServices', JSON.stringify(serviceIds));
  }

  isSelected(service: Service): boolean {
    return this.selectedServices().some((s) => s.id === service.id);
  }

  getDayName(dayOfWeek: number): string {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[dayOfWeek] || '';
  }

  selectDay(id: number) {
    this.selectedDay.set(id);
  }

  print() {
    console.log('👷‍♂️ Engineer Profile:', this.engineerProfile());
    console.log('🧩 Selected Services:', this.selectedServices());
    console.log(this.selectedDay())
  }
}
