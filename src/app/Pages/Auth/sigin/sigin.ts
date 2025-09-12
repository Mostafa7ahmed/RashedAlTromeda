import { Component } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-sigin',
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './sigin.html',
  styleUrls: ['./sigin.scss' , '../../../Shared/CSS/input.scss']
})
export class Sigin {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
form: FormGroup;



  passwordFieldType: boolean = true;
  submitted = false;
  result: any = null;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
      this.form = this.fb.group({
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  submit() {
    this.submitted = true;


    const phoneInput = this.form.value.phone;
    const password = this.form.value.password;

    if (!phoneInput || !phoneInput.e164Number) {
      console.error('لم يتم اختيار كود الدولة');
      return;
    }

    const body = {
      phone: phoneInput.e164Number,  // +20123456789
      password: password,
    };

    console.log('form payload:', body);

    // API call
 
  }
}
