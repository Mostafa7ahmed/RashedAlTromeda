import { Component } from '@angular/core';
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
  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
    });
  }


   submit() {


    const phoneInput = this.form.value.phone;

    if (!phoneInput || !phoneInput.e164Number) {
      console.error('لم يتم اختيار كود الدولة');
      return;
    }

    const body = {
      phone: phoneInput.e164Number,  // +20123456789
    };

    console.log('form payload:', body);

    // API call
 
  }
}
