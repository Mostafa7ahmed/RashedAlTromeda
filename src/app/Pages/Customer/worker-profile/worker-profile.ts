import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';

import { environment } from '../../../../environments/environment';
import { ExperiencePipe } from '../../../Shared/pipes/experience-pipe';
import { Rates } from './Components/rates/rates';

import { IEngineerProfile, Service } from '../../../Core/Interface/iengineer';
import { IEngineerSchedule } from '../../../Core/Interface/iengineer-schedule';
import { IRate } from '../../../Core/Interface/irate';
import { IBookingRequest } from '../../../Core/Interface/ibooking-request';

import { Engineer } from '../../../Core/service/engineer';
import { ScheduleService } from '../../../Core/service/schedule';
import { Booking } from '../../../Core/service/booking';
import { SweetAlert } from '../../../Core/service/sweet-alert';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
@Component({
  selector: 'app-worker-profile',
  imports: [ReactiveModeuls, ExperiencePipe, Rates ],
  templateUrl: './worker-profile.html',
  styleUrls: ['./worker-profile.scss' , '../../../Shared/CSS/popup.scss'],
})
export class WorkerProfile {
   // ✅ Services
  private engineerService = inject(Engineer);
  private route = inject(ActivatedRoute);
  private scheduleService = inject(ScheduleService);
  private bookingService = inject(Booking);
  private alert = inject(SweetAlert);

  // ✅ Signals
  engineerProfile = signal<IEngineerProfile | null>(null);
  engineerSchedule = signal<IEngineerSchedule[]>([]);
  engineerRate = signal<IRate[]>([]);
  selectedServices = signal<Service[]>([]);
  selectedDay = signal<number | null>(null);
  userId = signal<number | null>(null);
  engineerId = signal<number | null>(null);

  baseUrl: string = environment.baseUrl;
  form: FormGroup;

  totalPrice = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.price, 0)
  );

  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });

    const defaultIcon = L.icon({
      iconUrl: 'marker-icon.png',
      iconRetinaUrl: 'marker-icon-2x.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }

  ngOnInit() {
    const engineerIdRoute = Number(this.route.snapshot.paramMap.get('profileId'));
    if (!engineerIdRoute) return;

    this.engineerId.set(engineerIdRoute);
    this.loadEngineerProfile(engineerIdRoute);
    this.loadSchedule(engineerIdRoute);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // ============================
  // 🔹 Load Data
  // ============================
  private loadEngineerProfile(id: number) {
    this.engineerService.getProfileEngineer(id).subscribe({
      next: (res) => {
        const profile = res.result;
        this.engineerProfile.set(profile);
        this.userId.set(profile.userDto?.id || null);

        this.restoreSelectedServices(profile.services);
      },
      error: (err) => console.error('❌ خطأ أثناء تحميل بيانات المهندس:', err),
    });
  }

  private loadSchedule(engineerId: number) {
    this.scheduleService.getScheduleByEngineer(engineerId).subscribe({
      next: (res) => this.engineerSchedule.set(res.result),
      error: (err) => console.error('❌ خطأ أثناء تحميل الجدول:', err),
    });
  }

  toggleService(service: Service) {
    const current = this.selectedServices();
    const exists = current.some((s) => s.id === service.id);
    const updated = exists ? current.filter((s) => s.id !== service.id) : [...current, service];

    this.selectedServices.set(updated);
    localStorage.setItem('selectedServices', JSON.stringify(updated.map((s) => s.id)));
  }

  isSelected(service: Service): boolean {
    return this.selectedServices().some((s) => s.id === service.id);
  }

  private restoreSelectedServices(services: Service[]) {
    const stored = localStorage.getItem('selectedServices');
    const storedServiceId = Number(localStorage.getItem('serviceId'));

    let selected: Service[] = [];

    if (stored) {
      const ids: number[] = JSON.parse(stored);
      selected = services.filter((s) => ids.includes(s.id));
    }

    if (storedServiceId) {
      const matched = services.find((s) => s.id === storedServiceId);
      if (matched && !selected.some((s) => s.id === matched.id)) {
        selected.push(matched);
      }
    }

    this.selectedServices.set(selected);
  }

  getDayName(dayOfWeek: number): string {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[dayOfWeek] || '';
  }

  selectDay(id: number) {
    this.selectedDay.set(id);
  }


  private initMap() {
    this.map = L.map('map').setView([30.0444, 31.2357], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.marker = L.marker([30.0444, 31.2357], { draggable: true })
      .addTo(this.map)
      .bindPopup('اسحب العلامة لتغيير موقعك')
      .openPopup();

    this.map.on('click', (e: any) => this.setMarker(e.latlng.lat, e.latlng.lng));
    this.marker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      this.setMarker(lat, lng);
    });
  }

  private setMarker(lat: number, lon: number) {
    this.marker.setLatLng([lat, lon]);
    this.map.setView([lat, lon], 15);

    this.form.patchValue({ latitude: lat, longitude: lon });

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.display_name) {
          this.form.patchValue({ address: data.display_name });
        }
      })
      .catch(() => this.alert.error('حدث خطأ أثناء جلب العنوان'));
  }

  searchAddress() {
    const query = this.form.value.address;
    if (!query) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((results: any[]) => {
        if (results?.length) {
          const first = results[0];
          this.setMarker(+first.lat, +first.lon);
          this.form.patchValue({ address: first.display_name });
        } else {
          this.alert.error('لم يتم العثور على العنوان');
        }
      })
      .catch(() => this.alert.error('حدث خطأ أثناء البحث عن العنوان'));
  }

  useMyLocation() {
    if (!navigator.geolocation)
      return this.alert.error('المتصفح لا يدعم الموقع الجغرافي');

    navigator.geolocation.getCurrentPosition(
      (pos) => this.setMarker(pos.coords.latitude, pos.coords.longitude),
      (err) => this.alert.error(err.message)
    );
  }


  createBookingRequest() {

    const body: IBookingRequest = {
      engineerId: this.engineerId()!,
      engineerUserId: this.userId()!,
      scheduleId:1,
      services: this.selectedServices().map((s) => ({
        serviceId: s.id,
        quote: s.price,
      })),
      address: this.form.value.address,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
    };

    this.bookingService.createBooking(body).subscribe({
      next: (res) => {
        this.alert.toast('تم إرسال الطلب بنجاح ✅', 'success');
        console.log('📦 Response:', res);
      },
      error: (err) => {
        this.alert.toast('تم إرسال الطلب بنجاح ✅', 'error');
      },
    });
  }
}
