import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { Customer  , IEngineer} from '../../../Core/Interface/customer';
import { Register } from '../../../Core/service/register';
import { Otpservice } from '../../../Core/service/otp';
import { Router } from '@angular/router';
import { ICountry } from '../../../Core/Interface/icountry';
import { Country } from '../../../Core/service/country';
import { NgSelectModule } from '@ng-select/ng-select';
import { Streem } from '../../../Core/service/streem';
import { SweetAlert } from '../../../Core/service/sweet-alert';

@Component({
  selector: 'app-register-engineer',
  imports: [ReactiveModeuls, NgxIntlTelInputModule, FormsModule, NgSelectModule],
  templateUrl: './register-engineer.html',
  styleUrls: ['./register-engineer.scss', '../../../Shared/CSS/input.scss']
})
export class RegisterEngineer {
 SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  step = 1;
  passwordFieldType = true;
  submitted = false;
  isUploading = signal<boolean>(false); 

  form: FormGroup;
  countries = signal<ICountry[]>([]);
  selectedCountryId = signal<number | null>(null);
  avatarUrl = signal<string>('Icons/personal.svg');
  uploadedImageUrl = signal<string>('');

  private _countryService = inject(Country);
  private _uploadService = inject(Streem);
  private _register = inject(Register);
  private _otp = inject(Otpservice);
  private _router = inject(Router);
  private _alert = inject(SweetAlert); 

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      countryId: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      identityPhotoUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this._countryService.getcountry().subscribe({
      next: (res) => {
        if (res.success && res.result) this.countries.set(res.result);
      },
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  onSelect(countryId: number) {
    this.selectedCountryId.set(countryId);
  }

  nextStep() {
    if (this.form.get('name')?.invalid || this.form.get('phoneNumber')?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.step = 2;
  }

  prevStep() {
    this.step = 1;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.previewImage(file);
      this.isUploading.set(true); // ⛔️ تعطيل الزر

      this._uploadService.uploadStreem(file).subscribe({
        next: (res) => {
          if (res.success) {
            this.uploadedImageUrl.set(res.result.url);
            this.form.get('identityPhotoUrl')?.setValue(res.result.url);
            console.log('Uploaded image:', res.result.url);
            this._alert.toast('تم رفع الصورة بنجاح ✅', 'success');
          }
          this.isUploading.set(false); // ✅ تم الرفع
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.isUploading.set(false);
        }
      });
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  // ✅ التسجيل مع Toast بعد النجاح
  submit() {
    this.submitted = true;


  if (!this.form.value.countryId) {
    this._alert.toast('من فضلك اختر الدولة أولاً 🌍', 'warning');
    return;
  }

  if (!this.form.value.identityPhotoUrl) {
    this._alert.toast('من فضلك قم برفع صورة الهوية 📸', 'warning');
    return;
  }

  const phoneInput = this.form.value.phoneNumber;
  if (!phoneInput || !phoneInput.e164Number) {
    this._alert.toast('من فضلك أدخل رقم هاتف صالح 📞', 'warning');
    return;
  }

  if (this.form.invalid) {
    this._alert.toast('يرجى ملء جميع الحقول المطلوبة ✏️', 'warning');
    this.form.markAllAsTouched();
    return;
  }
    const body: IEngineer = {
      name: this.form.value.name,
      phoneNumber: phoneInput.e164Number,
      countryId: this.form.value.countryId,
      planId: 1,
      identityPhotoUrl: this.form.value.identityPhotoUrl,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword
    };

    console.log('Register payload:', body);

   this._register.createEngineer(body).subscribe({
  next: (res) => {
    if (res.success) {
      this._alert.toast(res.message || 'تم إنشاء الحساب بنجاح ✅', 'success');

      const otpBody = { phone: body.phoneNumber, type: 0 };
      this._otp.OTPFun(otpBody).subscribe({
        next: (otpRes) => {
          localStorage.setItem('token', otpRes.result.token);
          this._router.navigate(['/auth/otp'], {
            queryParams: { phone: body.phoneNumber }
          });
        },
        error: (err) => {
          this._alert.toast(err.error?.message || 'فشل إرسال رمز التحقق ❌', 'error');
          console.error('OTP error:', err);
        }
      });
    }
  },
  error: (err) => {
    this._alert.toast(err.error?.message , 'error');
    console.error('Register error:', err);
  }
});
  }
}
