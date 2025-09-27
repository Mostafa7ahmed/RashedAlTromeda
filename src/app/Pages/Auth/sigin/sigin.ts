import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { Customer } from '../../../Core/Interface/customer';
import { Register } from '../../../Core/service/register';
import { Otpservice } from '../../../Core/service/otp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './sigin.html',
  styleUrls: ['./sigin.scss', '../../../Shared/CSS/input.scss']
})
export class Sigin {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  form: FormGroup;

  passwordFieldType: boolean = true;
  submitted = false;
  result: any = null;

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

    this.customerService.createCustomer(body).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Customer created:', res);

          const otpBody = {
            phone: body.phoneNumber,
            type: 0
          };

          // Call OTP API
          this.otpService.OTPFun(otpBody).subscribe({
            next: (otpRes) => {
              console.log('OTP sent:', otpRes);
              // redirect to OTP page
              this.router.navigate(['/auth/otp'], {
                queryParams: { phone: body.phoneNumber }
              });
              localStorage.setItem('token', otpRes.result.token);
            },
            error: (err) => {
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
