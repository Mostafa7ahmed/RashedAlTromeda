import { Component, effect, inject, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { IProfileEngineer } from '../../../../../Core/Interface/iprofile-engineer';
import { ProfileEngineerService } from '../../../../../Core/service/engineer/profile';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-job',
  imports: [TranslatePipe, ReactiveModeuls],
  templateUrl: './new-job.html',
  styleUrl: './new-job.scss'
})
export class NewJob {
  readonly baseUrl = environment.baseUrl;

  private _profile = inject(ProfileEngineerService);
  private router = inject(Router);

  profile = signal<IProfileEngineer | null>(null);


  constructor() {
    effect(() => {
      this._profile.refreshComplaints();
      this.loadProfile();
    });
  }

  private loadProfile() {
    this._profile.getProfile().subscribe({
      next: ({ result }) => {
        this.profile.set(result); // تعيين النتيجة للـ signal
        console.log(this.profile());
      },
      error: console.error
    });
  }
    openPopup() {
    this.router.navigate(['/engineer', { outlets: { popup: ['addService'] } }]);

  }

}
