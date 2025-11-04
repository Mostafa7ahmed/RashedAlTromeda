import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { Profile } from '../../../../../Core/service/Customer/profile';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { Streem } from '../../../../../Core/service/streem';
import { environment } from '../../../../../../environments/environment';
import { UpdateProfile } from '../../../../../Core/Interface/iprofile-customer';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';
import { IProfileEngineer, UpdateProfileEngineer } from '../../../../../Core/Interface/iprofile-engineer';
import { ProfileOrganizationService } from '../../../../../Core/service/Organization/profileOrganization';
import { IMainOrganization, IProfileOrganization, UpdataOrganization } from '../../../../../Core/Interface/iprofile-organization';

@Component({
  selector: 'app-personal-info',
  imports: [NgxIntlTelInputModule, ReactiveModeuls],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss', '../../../../../Shared/CSS/input.scss'],
  standalone: true
})
export class PersonalInfo implements OnInit {
 readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly defaultImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  readonly baseUrl = environment.baseUrl;

  fullName = signal('');
  phone = signal('');
  points = signal(0);
  image = signal<string>(this.defaultImage);
  isUploading = signal(false);
  description = signal('');

  private originalProfile?: UpdataOrganization;
  private _profile = inject(ProfileOrganizationService);
  private _upload = inject(Streem);
  private _alert = inject(SweetAlert);

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this._profile.getProfile().subscribe({
      next: (res) => {
      const { result } = res;
        this.originalProfile = result.user;
        console.log(this.originalProfile)
      const user = result.user;
        this.fullName.set(user.name)
        this.fullName.set(user.name);
        this.phone.set(user.phone);
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
       if (!this.originalProfile) return;
          const { latitude, longitude, address } = this.originalProfile;
          console.log( this.originalProfile)
   const profileData: UpdataOrganization = {
      name: this.fullName(),
      photoUrl: this.image().replace(this.baseUrl, ''),
      address: address ?? '',
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
    };
    console.log(profileData)

    this._profile.updateProfile(profileData).subscribe({
      next: res => {
        this._alert.toast(res.message || 'تم تحديث البيانات بنجاح', 'success');
      },
      error: err => {
        this._alert.toast(err.error?.message || 'حدث خطأ أثناء التحديث', 'error');
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
