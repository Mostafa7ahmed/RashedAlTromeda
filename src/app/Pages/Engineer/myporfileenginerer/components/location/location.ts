import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { Profile } from '../../../../../Core/service/Customer/profile';
import { UpdateProfile, UserDto } from '../../../../../Core/Interface/iprofile-customer';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';
import { UpdateProfileEngineer } from '../../../../../Core/Interface/iprofile-engineer';
import { ProfileCompletion } from '../../../../../Core/service/engineer/profile-completion';
import { ProfileEngineerService } from '../../../../../Core/service/engineer/profile';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-location',
  imports: [ReactiveModeuls , TranslatePipe],
  templateUrl: './location.html',
  styleUrls: ['./location.scss'] // صححت styleUrls
})
export class Location {
  form: FormGroup;
  private map!: L.Map;
  private marker!: L.Marker;
  private _profile = inject(ProfileEngineerService);
private _profileUser!: UserDto;
private _profileData: any;

  private _alert = inject(SweetAlert);

  constructor(private fb: FormBuilder, private ProfileCompletion: ProfileCompletion) {
    this.form = this.fb.group({
      address: [''],
      latitude: [null],
      longitude: [null]
    });

    const DefaultIcon = L.icon({
      iconUrl: 'marker-icon.png',
      iconRetinaUrl: 'marker-icon-2x.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([30.0444, 31.2357], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.loadProfile();
  }

private loadProfile() {
  this._profile.getProfile().subscribe({
    next: (res) => {
      const profile = res.result;
      this._profileData = profile; 

      const user = profile.userDto;
      this._profileUser = user;

      this.form.patchValue({
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude
      });

      this.marker = L.marker([user.latitude, user.longitude], { draggable: true })
        .addTo(this.map)
        .bindPopup('اسحب العلامة لتغيير موقعك')
        .openPopup();

      this.map.setView([user.latitude, user.longitude], 15);

      this.marker.on('dragend', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        this.setMarker(lat, lng);
      });

      this.map.on('click', (e: any) => this.setMarker(e.latlng.lat, e.latlng.lng));
    },
    error: (err) => {
      console.error('Error loading profile:', err);
    }
  });
}

  private setMarker(lat: number, lon: number) {
    if (this.marker) this.marker.setLatLng([lat, lon]);
    this.map.setView([lat, lon], 15);

    this.form.patchValue({ latitude: lat, longitude: lon });

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .then(r => r.json())
      .then(data => {
        if (data?.display_name) this.form.patchValue({ address: data.display_name });
      });
  }

  searchAddress() {
    const q = this.form.value.address;
    if (!q) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then((results: any[]) => {
        if (results?.length) {
          const first = results[0];
          this.setMarker(+first.lat, +first.lon);
          this.form.patchValue({ address: first.display_name });
        } else {
        this._alert.toast('لم يتم العثور على العنوان', 'error');
        }
      });
  }

useMyLocation() {
  if (!navigator.geolocation) {
    this._alert.toast('المتصفح لا يدعم الموقع الجغرافي', 'error');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => this.setMarker(pos.coords.latitude, pos.coords.longitude),
    err => this._alert.toast(err.message || 'حدث خطأ أثناء الحصول على الموقع', 'error')
  );
}

submit() {
  const user = this._profileUser; 
  if (!user) return;

  // بنفترض إنك خزّنت الـ profile الكامل في متغير عند تحميل البيانات
  const profile = this._profileData; // نحفظه في loadProfile (هتشوفها تحت 👇)

  // نبني الـ payload على أساس البيانات القديمة مع تحديث العنوان فقط
  const payload: UpdateProfileEngineer = {
    name: user.name,
    address: this.form.value.address,
    photoUrl: user.photoUrl,
    latitude: this.form.value.latitude,
    longitude: this.form.value.longitude,
    summary: profile.summary,
    startYear: profile.startYear,
    identityPhotoUrl: profile.identityPhotoUrl,
    services: profile.services,
    countryId: profile.countryId,
    planId: profile.planId,
  };

  console.log('📦 Payload sent:', payload);

  this.ProfileCompletion.ProfileCompletion(payload).subscribe({
    next: res => {
      this._alert.toast(res.message || 'تم تحديث العنوان بنجاح', 'success');
    },
    error: err => {
      this._alert.toast(err.error?.message || 'حدث خطأ أثناء حفظ البيانات', 'error');
    }
  });
}
  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
