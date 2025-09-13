import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-select-map',
  imports: [ ReactiveModeuls , LeafletModule],
  templateUrl: './select-map.html',
  styleUrl: './select-map.scss'
})
export class SelectMap {
form: FormGroup;
map!: L.Map;
marker!: L.Marker;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 })
    ],
    zoom: 13,
    center: L.latLng(30.0444, 31.2357)
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ address: [''], latitude: [null], longitude: [null] });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.marker = L.marker([30.0444,31.2357]).addTo(map);
    // يمكن إضافة control geocoder:
    // @ts-ignore
    L.Control.geocoder().addTo(map);

    map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.marker.setLatLng(e.latlng);
      this.form.patchValue({ latitude: lat, longitude: lng });
      // نعمل reverse geocoding عن طريق Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
        .then(r => r.json())
        .then(data => {
          const address = data.display_name;
          this.form.patchValue({ address });
        });
    });
  }

  searchAddress() {
    const q = this.form.value.address;
    if (!q) return;
    // Nominatim search
    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then((results: any[]) => {
        if (results && results.length) {
          const first = results[0];
          const lat = +first.lat, lon = +first.lon;
          this.map.setView([lat, lon], 16);
          this.marker.setLatLng([lat, lon]);
          this.form.patchValue({ latitude: lat, longitude: lon, address: first.display_name });
        } else {
          alert('لم يتم العثور على عنوان');
        }
      });
  }

  useMyLocation() {
    if (!navigator.geolocation) { alert('لا يدعم المتصفح'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude, lon = pos.coords.longitude;
      this.map.setView([lat, lon], 16);
      this.marker.setLatLng([lat, lon]);
      // reverse geocode كما بالـ fetch أعلاه...
    }, err => alert(err.message));
  }

  submit() { console.log(this.form.value); }
}
