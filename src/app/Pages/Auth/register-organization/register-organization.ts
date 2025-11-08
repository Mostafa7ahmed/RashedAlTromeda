import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { Customer, Organization } from '../../../Core/Interface/customer';
import { Register } from '../../../Core/service/register';
import { Otpservice } from '../../../Core/service/otp';
import { Router } from '@angular/router';
import { SweetAlert } from '../../../Core/service/sweet-alert';
@Component({
  selector: 'app-register-organization',
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './register-organization.html',
  styleUrls:[ './register-organization.scss' , '../../../Shared/CSS/input.scss']
})
export class RegisterOrganization {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  form: FormGroup;

  passwordFieldType: boolean = true;
  submitted = false;
  result: any = null;
  private _alert = inject(SweetAlert); 

  constructor(
    private fb: FormBuilder,
    private customerService: Register,
    private otpService: Otpservice,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  submit() {
    this.submitted = true;

    const phoneInput = this.form.value.phone;
    if (!phoneInput || !phoneInput.e164Number) {
      console.error('لم يتم اختيار كود الدولة');
      return;
    }

    const body: Organization = {
      name: this.form.value.name,
      phoneNumber: phoneInput.e164Number,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword
    };

    console.log('Register payload:', body);

    this.customerService.createOrganization(body).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Customer created:', res);
      this._alert.toast(res.message || 'تم إنشاء الحساب بنجاح ✅', 'success');

          const otpBody = {
            phone: body.phoneNumber,
            type: 0
          };

          // Call OTP API
          this.otpService.OTPFun(otpBody).subscribe({
            next: (otpRes) => {
              console.log('OTP sent:', otpRes);
              this.router.navigate(['/auth/otp'], {
                queryParams: { phone: body.phoneNumber }
              });
              localStorage.setItem('token', otpRes.result.token);

            },
            error: (err) => {
                        this._alert.toast(err.error?.message || 'فشل إرسال رمز التحقق ❌', 'error');

              console.error('OTP error:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Register error:', err);
      }
    });
  }
}
