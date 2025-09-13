import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-select-map',
  imports: [ReactiveModeuls],
  templateUrl: './select-map.html',
  styleUrl: './select-map.scss'
})
export class SelectMap implements OnDestroy {
  form: FormGroup;
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private fb: FormBuilder) {
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

// خلي أي Marker جديد يستخدم الأيقونة دي
L.Marker.prototype.options.icon = DefaultIcon;
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([30.0444, 31.2357], 13); // القاهرة

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // marker أساسي
    this.marker = L.marker([30.0444, 31.2357], { draggable: true })
      .addTo(this.map)
      .bindPopup('اسحب العلامة لتغيير موقعك')
      .openPopup();

    // كليك على الخريطة
    this.map.on('click', (e: any) => this.setMarker(e.latlng.lat, e.latlng.lng));

    // سحب العلامة
    this.marker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      this.setMarker(lat, lng);
    });

    // Geocoder control
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

    // reverse geocode
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

  submit() {
    console.log('📌 البيانات:', this.form.value);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // تنظيف الخريطة عند تدمير الكمبوننت
    }
  }
}
