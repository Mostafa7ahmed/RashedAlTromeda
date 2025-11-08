import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { Profile } from '../../../../../Core/service/Customer/profile';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { Streem } from '../../../../../Core/service/streem';
import { environment } from '../../../../../../environments/environment';
import { UpdateProfile } from '../../../../../Core/Interface/iprofile-customer';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  imports: [NgxIntlTelInputModule, ReactiveModeuls , TranslatePipe],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss', '../../../../../Shared/CSS/input.scss'],
  standalone: true
})
export class PersonalInfo implements OnInit {
  // Constants
  readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly defaultImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  readonly baseUrl = environment.baseUrl;

  // Signals
  fullName = signal('');
  phone = signal('');
  phoneSend = signal('');
  points = signal(0);
  address = signal('');
  latitude = signal(0);
  longitude = signal(0);
  image = signal<string>(this.defaultImage);
  isUploading = signal(false);
  private _profile = inject(Profile);
  private _upload = inject(Streem);
  private _alert = inject(SweetAlert);

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this._profile.getProfile().subscribe({
      next: ({ result }) => {
        const user = result.userDto;
        this.fullName.set(user.name);
        this.phone.set(user.phone);
        this.points.set(result.totalPoint);
        this.address.set(user.address || '');
        this.latitude.set(user.latitude || 0);
        this.longitude.set(user.longitude || 0);
        this.setImage(user.photoUrl);
      },
      error: console.error
    });
  }

  private setImage(photoUrl?: string) {
    if (!photoUrl) return this.image.set(this.defaultImage);
    const fullUrl = photoUrl.startsWith('http')
      ? photoUrl
      : `${this.baseUrl}${photoUrl.startsWith('/') ? photoUrl.slice(1) : photoUrl}`;
    this.image.set(fullUrl);
  }
onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.image.set(reader.result as string);
  reader.readAsDataURL(file);

  this.isUploading.set(true);
  this._upload.uploadStreem(file).subscribe({
    next: ({ result }) => {
      this.setImage(result.url);
      this.isUploading.set(false);
    },
    error: (err) => {
      this._alert.toast(err.error?.message || 'حدث خطأ أثناء رفع الصورة', 'error');
      this.isUploading.set(false);
    }
  });
}
  onSave() {
    const profileData: UpdateProfile = {
      name: this.fullName(),
      address: this.address(),
      photoUrl: this.image().replace(this.baseUrl, ''),
      latitude: this.latitude(),
      longitude: this.longitude(),
    };

    this._profile.updateProfile(profileData).subscribe({
      next: res => {
        this._alert.toast( res.message || 'تم الحفظ بنجاح', 'success');
      },

      error: err => {
              this._alert.toast(err.error?.message || 'حدث خطأ أثناء  التحديث', 'error');

      }
    });
  }

  get phoneModel() {
    return this.phone();
  }

  set phoneModel(value: any) {
    this.phone.set(typeof value === 'string' ? value : value?.nationalNumber   ?? '');
  }


}
