import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Otpservice } from '../../../Core/service/otp';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { SweetAlert } from '../../../Core/service/sweet-alert';

@Component({
  selector: 'app-otp',
  imports: [ReactiveModeuls],
  templateUrl: './otp.html',
  styleUrls: ['./otp.scss', '../forgetpassword/forgetpassword.scss', '../../../Shared/CSS/input.scss']
})
export class Otp {
  formOtp!: FormGroup;
  phoneNumber: string = '';
  timer: number = 30; // 3 دقائق = 180 ثانية
  timerDisplay: string = '03:00';
  timerSub!: Subscription;
  private _alert = inject(SweetAlert);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private otpService: Otpservice
  ) { }

  ngOnInit(): void {
    // جلب رقم الهاتف من queryParams
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phone'] || '';
    });

    // بناء الفورم
    this.formOtp = this.fb.group({
      d1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d3: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });

    // بدء العداد
    this.startTimer();
  }

  // تحويل الثواني إلى 00:00
  startTimer() {
    this.timer = 180;
    this.updateTimerDisplay();
    this.timerSub = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateTimerDisplay();
        this.cdr.detectChanges(); // ✅ تحديث يدوي
      } else {
        this.timerSub.unsubscribe();
      }
    });
  }

  private updateTimerDisplay() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
  resendOtp() {
    if (!this.phoneNumber) return;

    const body = {
      phone: this.phoneNumber,
      type: 0
    };

    this.otpService.OTPFun(body).subscribe({
      next: (res) => {
        console.log('OTP resent:', res);
        this.startTimer(); // إعادة ضبط العداد
        this._alert.toast(res.message || 'تم إنشاء الحساب بنجاح ✅', 'success');

      },
      error: (err) => {
        console.error('Error resending OTP:', err);
        this._alert.toast(err.error?.message || 'فشل إرسال رمز التحقق ❌', 'error');

      }
    });
  }

  submitOtp() {
    if (this.formOtp.invalid) {
      console.error('OTP form invalid');
      return;
    }

    const otpCode =
      this.formOtp.value.d1 +
      this.formOtp.value.d2 +
      this.formOtp.value.d3;

    const body = {
      token: localStorage.getItem('token') || '',
      code: otpCode
    };

    console.log('OTP Verify Payload:', body);

    this.otpService.verifyOtp(body).subscribe({
      next: (res) => {
        console.log('OTP verified:', res);
        this.router.navigate(['/auth/selectMap']);
        this._alert.toast(res.message || 'تم إنشاء الحساب بنجاح ✅', 'success');

      },
      error: (err) => {
        console.error('OTP verify error:', err);
        this._alert.toast(err.error?.message || 'فشل إرسال رمز التحقق ❌', 'error');

      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
