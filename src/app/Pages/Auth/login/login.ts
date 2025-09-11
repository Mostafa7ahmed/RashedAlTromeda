import { Component } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-login',
  imports: [...ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  form: any;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: [null, [Validators.required, Validators.min(0)]],
      phone: [undefined, Validators.required]
    });
  }




  submitted = false;
  result: any = null;




  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    // الـ phone control يرجّع كائن يحتوي e164Number وnationalNumber الخ.
    const phoneValue = this.form.value.phone;


    this.result = {
      name: this.form.value.name,
      email: this.form.value.email,
      number: this.form.value.number,
      phone: phoneValue?.e164Number ?? phoneValue
    };


    console.log('form payload:', this.result);
  }
}
