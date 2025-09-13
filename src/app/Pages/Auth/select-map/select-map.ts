import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-select-map',
  imports: [ ReactiveModeuls],
  templateUrl: './select-map.html',
  styleUrl: './select-map.scss'
})
export class SelectMap {
 form: FormGroup;
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: [''],
      latitude: [null],
      longitude: [null]
    });
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

    // لما اضغط على الخريطة
    this.map.on('click', (e: any) => this.setMarker(e.latlng.lat, e.latlng.lng));

    // لما أسحب العلامة
    this.marker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      this.setMarker(lat, lng);
    });
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
    console.log(this.form.value);
    // ابعته للباك إند
  }
}
