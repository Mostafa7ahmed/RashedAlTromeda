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
import { IMainOrganization, IProfileOrganization, UpdataCenter, UpdataOrganization } from '../../../../../Core/Interface/iprofile-organization';
import { ProfileCenterService } from '../../../../../Core/service/Center/profileCenter';
import { TranslatePipe } from '@ngx-translate/core';
export enum CenterType {
  Sales = 0,
  Services = 1,
  Both = 2
}

@Component({
  selector: 'app-personal-info',
  imports: [NgxIntlTelInputModule, ReactiveModeuls , TranslatePipe],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss', '../../../../../Shared/CSS/input.scss'],
  standalone: true
})
export class PersonalInfo implements OnInit {
   readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly defaultImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  readonly baseUrl = environment.baseUrl;
  CenterType = CenterType;

  selectedType: CenterType | null = null;

  fullName = signal('');
  phone = signal('');
  points = signal(0);
  image = signal<string>(this.defaultImage);
  isUploading = signal(false);
  description = signal('');

  private originalProfile?: UpdataCenter;
  private _profile = inject(ProfileCenterService);
  private _upload = inject(Streem);
  private _alert = inject(SweetAlert);

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this._profile.getProfile().subscribe({
      next: (res) => {
        const { result } = res;
        const user = result.user;

      this.originalProfile = {
        ...user,
        type: Number(result.type) || 0
      };
    const typeNumber = Number(result.type) || 0;
    this.selectedType = typeNumber as CenterType;
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

    const profileData: UpdataCenter = {
      name: this.fullName(),
      photoUrl: this.image().replace(this.baseUrl, ''),
      address: address ?? '',
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      type: this.selectedType ?? 0
    };

    this._profile.updateProfile(profileData).subscribe({
      next: res => {
        this._alert.toast(res.message || 'تم تحديث البيانات بنجاح', 'success');
      },
      error: err => {
        this._alert.toast(err.error?.message || 'حدث خطأ أثناء التحديث', 'error');
      }
    });
  }


  onSelect(type: CenterType) {
    this.selectedType = type;
  }

  get phoneModel() {
    return this.phone();
  }

  set phoneModel(value: any) {
    this.phone.set(typeof value === 'string' ? value : value?.nationalNumber ?? '');
  }
}
