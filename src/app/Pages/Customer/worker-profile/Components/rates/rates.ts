import { Component, inject, Input, signal } from '@angular/core';
import { Rate } from '../../../../../Core/service/rate';
import { IAddRate, IRate } from '../../../../../Core/Interface/irate';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { environment } from '../../../../../../environments/environment';
import { LoginService } from '../../../../../Core/service/login';
import { IDecode } from '../../../../../Core/Interface/idecode';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';

@Component({
  selector: 'app-rates',
  imports: [ReactiveModeuls],
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {
   private _rate = inject(Rate);
  private _user = inject(LoginService);
  private _aleart = inject(SweetAlert);

@Input() engineerId: number | null = null;
@Input() userId: number | null = null;


  userName = '';
  userImage = 'Icons/logoNavbar.svg';

  baseUrl: string = environment.baseUrl;
  engineerRate = signal<IRate[]>([]);
  newText = signal('');
  newRate = signal(0);

  ngOnInit() {
    const user = this._user.getUser() as IDecode | null;
    if (user) {
      this.userName = user.Name;
      this.userImage =  user.PhotoUrl
        ? `${this.baseUrl}${user.PhotoUrl}`
        : 'https://randomuser.me/api/portraits/men/32.jpg';
    }

    if (this.engineerId) {
      this.loadRates(this.engineerId);
    }
  }

  loadRates(engineerId: number) {
    this._rate.getRateByEngineer(engineerId).subscribe({
      next: (res) => {
        this.engineerRate.set(res.result);
      },
      error: (err) => console.error(err),
    });
  }

addReview() {
  if (!this.newText() || this.newRate() === 0) {
    this._aleart.toast('من فضلك اختر تقييم أولًا ⭐', 'warning');
    return;
  }

  if (this.engineerId == null || this.userId == null) {
    console.warn('Missing engineerId or userId');
    return;
  }

  const payload: IAddRate = {
    engineerId: this.engineerId,
    engineerUserId: this.userId,
    value: this.newRate(),
    comment: this.newText(),
  };

  this._rate.addRate(payload).subscribe({
    next: (res) => {
      if (res.success && res.result) {
        const newRate: IRate = {
          id: res.result.id,
          engineerId: res.result.engineerId,
          value: res.result.value,
          comment: res.result.comment,
          createdOn: res.result.createdOn,
          creator: {
            id: 0,
            name: this.userName,
            phone: '',
            address: '',
            photoUrl: this.userImage,
            latitude: 0,
            longitude: 0,
          },
        };

        this.engineerRate.update((arr) => [...arr, newRate]);
        this.newText.set('');
        this.newRate.set(0);

        this._aleart.toast('تم إضافة التقييم بنجاح ✅', 'success');
      } else {
        this._aleart.toast('حدث خطأ أثناء إضافة التقييم ❌', 'error');
      }
    },
    error: (err) => {
      console.error('Error adding review:', err);
      this._aleart.toast(err.error?.message || 'فشل في إضافة التقييم', 'error');
    },
  });
}


  getRandomLikes(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}
