import { Component, signal } from '@angular/core';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './forgetpassword.html',

    styleUrls: ['./forgetpassword.scss', '../../../Shared/CSS/input.scss']

})
export class Forgetpassword {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  currentStep = signal(1); // 1: phone, 2: otp, 3: password

  formPhone: FormGroup;
  formOtp: FormGroup;
  formPassword: FormGroup;

  phoneNumber: string = '';
  passwordFieldType: boolean = true;

  constructor(private fb: FormBuilder) {
    this.formPhone = this.fb.group({
      phone: ['', Validators.required],
    });

    this.formOtp = this.fb.group({
      d1: ['', Validators.required],
      d2: ['', Validators.required],
      d3: ['', Validators.required],
      d4: ['', Validators.required],
    });

    this.formPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', Validators.required],
    });
  }
togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  // Step 1
  submitPhone() {
    const phoneInput = this.formPhone.value.phone;
    if (!phoneInput || !phoneInput.e164Number) {
      console.error('لم يتم اختيار كود الدولة');
      return;
    }

    this.phoneNumber = phoneInput.e164Number; 
    console.log('phone payload:', { phone: this.phoneNumber });

    // TODO: call API send otp
    this.currentStep.set(2);
  }

  // Step 2
  submitOtp() {
    const otpCode = Object.values(this.formOtp.value).join('');
    console.log('otp code:', otpCode);

    if (otpCode.length !== 4) {
      console.error('الرجاء إدخال الكود كامل');
      return;
    }

    // TODO: verify otp API
    this.currentStep.set(3);
  }

  // Step 3
  submitPassword() {
    const { password, repassword } = this.formPassword.value;

    if (password !== repassword) {
      console.error('كلمة المرور غير متطابقة');
      return;
    }

    const body = {
      phone: this.phoneNumber,
      password,
    };

    console.log('reset password payload:', body);
  }
}
