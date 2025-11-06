import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { Customer } from '../../../Core/Interface/customer';
import { Register } from '../../../Core/service/register';
import { Otpservice } from '../../../Core/service/otp';
import { Router } from '@angular/router';
import { LoginService } from '../../../Core/service/login';
import { SweetAlert } from '../../../Core/service/sweet-alert';

@Component({
  selector: 'app-register-customer',
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './register-customer.html',
  styleUrls: ['./register-customer.scss', '../../../Shared/CSS/input.scss']

})
export class RegisterCustomer {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  form: FormGroup;

  passwordFieldType: boolean = true;
  submitted = false;
  result: any = null;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private customerService: Register,
    private otpService: Otpservice,
    private router: Router,
    private loginService: LoginService,
    private aleart: SweetAlert) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', [Validators.required]]
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

    const body: Customer = {
      name: this.form.value.name,
      phoneNumber: phoneInput.e164Number,
      password: this.form.value.password,
      confirmedPassword: this.form.value.confirmedPassword
    };

    console.log('Register payload:', body);
    this.isLoading.set(true);

    this.customerService.createCustomer(body).subscribe({
      next: (res) => {
        if (res.success) {
          this.aleart.toast(res.message, 'success');
          this.isLoading.set(false);

          const otpBody = {
            phone: body.phoneNumber,
            type: 0
          };

          const { accessToken } = res.result;

          this.loginService.saveTokensMap(accessToken); this.otpService.OTPFun(otpBody).subscribe({
            next: (otpRes) => {
              console.log('OTP sent:', otpRes);
              this.aleart.toast(otpRes.message, 'success');
            this.isLoading.set(false);

              this.router.navigate(['/auth/otp'], {
                queryParams: { phone: body.phoneNumber }
              });
              localStorage.setItem('token', otpRes.result.token);
            },
            error: (err) => {
                  this.isLoading.set(false);

              console.error('OTP error:', err);
              this.aleart.toast(err.error.message, 'error');

            }
          });
        }
      },
      error: (err) => {
            this.isLoading.set(false);

        console.error('Register error:', err);
        this.aleart.toast(err.error.message, 'error');

      }
    });
  }
}
