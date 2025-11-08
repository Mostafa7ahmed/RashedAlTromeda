import { Component, computed, effect, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SerciceCategory } from '../../../../../../Core/service/sercice-category';
import { IService } from '../../../../../../Core/Interface/icategory';
import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';
import { ProfileEngineerService } from '../../../../../../Core/service/engineer/profile';
import { IProfileEngineer, Service, UpdateProfileEngineer } from '../../../../../../Core/Interface/iprofile-engineer';
import { SweetAlert } from '../../../../../../Core/service/sweet-alert';

@Component({
  selector: 'app-add-service',
  imports: [TranslatePipe],
  templateUrl: './add-service.html',
  styleUrls: ['./add-service.scss', '../../../../../../Shared/CSS/popup.scss'],

})
export class AddService {
  private _serviceCategory = inject(SerciceCategory);
  private router = inject(Router);
  private _profile = inject(ProfileEngineerService);
  private _alert = inject(SweetAlert);

  servicesList = signal<IService[]>([]);
  selectedServices = signal<{ id: number; price: number; checked: boolean }[]>([]);
  profile = signal<IProfileEngineer | null>(null);

  baseurl = environment.baseUrl;



  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this._profile.getProfile().subscribe({
      next: ({ result }) => {
        this.profile.set(result);
        this.loadServices();
      },
      error: console.error
    });
  }
  loadServices() {
    this._serviceCategory.getAllService().subscribe({
      next: (res) => {
        const allServices = res.result;

        // إنشاء مصفوفة selectedServices بناءً على الخدمات الموجودة في profile
        const profileServices = this.profile()?.services || [];
        const initial = allServices.map(s => {
          const match = profileServices.find(ps => ps.id === s.id);
          return {
            id: s.id,
            price: match?.price || 0,
            checked: !!match
          };
        });

        this.servicesList.set(allServices);
        this.selectedServices.set(initial);
      },
      error: console.error,
    });
  }

  getServiceState(id: number) {
    return computed(() => this.selectedServices().find(s => s.id === id));
  }

  toggleService(id: number, checked: boolean) {
    const updated = this.selectedServices().map(s => s.id === id ? { ...s, checked } : s);
    this.selectedServices.set(updated);
  }

  setPrice(id: number, price: number) {
    const updated = this.selectedServices().map(s => s.id === id ? { ...s, price: +price } : s);
    this.selectedServices.set(updated);
  }

  submit() {
    if (!this.profile()) return;

    const chosenServices = this.selectedServices()
      .filter(s => s.checked)
      .map(s => ({ id: s.id, price: s.price }));

    const profileUpdate: UpdateProfileEngineer = {
      name: this.profile()!.userDto.name,
      address: this.profile()!.userDto.address || '',
      photoUrl: this.profile()!.userDto.photoUrl || '',
      latitude: this.profile()!.userDto.latitude || 0,
      longitude: this.profile()!.userDto.longitude || 0,
      summary: this.profile()!.summary || '',
      startYear: this.profile()!.startYear || 0,
      identityPhotoUrl: this.profile()!.identityPhotoUrl || '',
      services: chosenServices,
      countryId: this.profile()!.countryId || 0,
      planId: this.profile()!.planId || 1,
    };

    this._profile.updateProfile(profileUpdate).subscribe({
      next: res => {
        this._alert.toast(res.message || 'تم إضافة الاقتراح بنجاح', 'success');

        this._profile.notifyRefresh();
        this.closePopup()
      },
      error: err => this._alert.toast(err.error?.message || 'حدث خطأ أثناء الإضافة', 'error'),
    });
  }

  closePopup() {
    this.router.navigate(['/engineer', { outlets: { popup: null } }]);
  }
}
