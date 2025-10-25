import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { Profile } from '../../../../../Core/service/Customer/profile';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-personal-info',
  imports: [NgxIntlTelInputModule, ReactiveModeuls],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss', '../../../../../Shared/CSS/input.scss']
})
export class PersonalInfo implements OnInit {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  fullName = signal('');
  phone = signal('');   // هذا signal يخزن القيمة النهائية كنص
  points = signal(0);
  image = signal('');
  phoneSend = signal('');
  private _profile = inject(Profile);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this._profile.getProfile().subscribe({
      next: (res) => {
        const user = res.result.userDto;
        this.fullName.set(user.name);
        this.phone.set(user.phone);
        this.points.set(res.result.totalPoint);
        this.image.set(user.photoUrl || 'https://randomuser.me/api/portraits/men/32.jpg');
      },
      error: (err) => console.error(err)
    });
  }

  get phoneModel() {
    return this.phone();
  }
  set phoneModel(v: any) {
    this.phone.set(typeof v === 'string' ? v : (v?.internationalNumber ?? JSON.stringify(v)));
  }
  onPhoneChange(value: any) {
    this.phone.set(typeof value === 'string' ? value : (value?.nationalNumber ?? ''));
    this.phoneSend.set(typeof value === 'string' ? value : (value?.e164Number ?? ''));
  }

  onSave() {
    console.log('name', this.fullName());
    console.log('phone', this.phone());
    console.log('phoneSend', this.phoneSend());

  }

}
