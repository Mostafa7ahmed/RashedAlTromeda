import { Component, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { ProfileCompletion } from '../../../../../Core/service/Customer/profile-completion';
import { AddCenter } from '../../../../../Core/service/Organization/add-center';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';

@Component({
  selector: 'app-add-center-account',
  standalone: true,
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './add-center-account.html',
  styleUrls: ['./add-center-account.scss', '../../../../../Shared/CSS/input.scss']
})
export class AddCenterAccount implements AfterViewInit, OnDestroy {

  form: FormGroup;
  hideOld = signal(true);
  hideNew = signal(true);
  hideConfirm = signal(true);

  readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;

  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private fb: FormBuilder,  private aleart: SweetAlert,private _addCenter: AddCenter) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', Validators.required],
      address: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
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
    this.map = L.map('map').setView([30.0444, 31.2357], 13); // القاهرة

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
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

    // @ts-ignore
    L.Control.geocoder({
      defaultMarkGeocode: false
    }).on('markgeocode', (e: any) => {
      const latlng = e.geocode.center;
      this.setMarker(latlng.lat, latlng.lng);
      this.form.patchValue({ address: e.geocode.name });
    }).addTo(this.map);
  }


  private setMarker(lat: number, lon: number) {
    this.marker.setLatLng([lat, lon]);
    this.map.setView([lat, lon], 15);

    this.form.patchValue({ latitude: lat, longitude: lon });

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .then(r => r.json())
      .then(data => {
        if (data?.display_name) {
          this.form.patchValue({ address: data.display_name });
        }
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
          alert('لم يتم العثور على العنوان');
        }
      });
  }

  useMyLocation() {
    if (!navigator.geolocation) return alert('المتصفح لا يدعم الموقع الجغرافي');
    navigator.geolocation.getCurrentPosition(
      pos => this.setMarker(pos.coords.latitude, pos.coords.longitude),
      err => alert(err.message)
    );
  }


  toggle(field: 'old'  | 'confirm') {
    if (field === 'old') this.hideOld.set(!this.hideOld());
    if (field === 'confirm') this.hideConfirm.set(!this.hideConfirm());
  }


  submit() {
      const formValue = this.form.value;
    const phoneInput = this.form.value.phone;

  const body = {
    name: formValue.name,
    phone: phoneInput.e164Number, // الرقم بكود الدولة
    password: formValue.password,
    confirmedPassword: formValue.confirmedPassword,
    address: formValue.address,
    latitude: formValue.latitude,
    longitude: formValue.longitude
  };

this._addCenter.addCenter(body).subscribe({
    next: (response) => {
    this.aleart.toast(response.message, 'success');
    this.form.reset()
    },
    error: (error) => {
    this.aleart.toast(error.error.message, 'error');
    }
  });    }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
