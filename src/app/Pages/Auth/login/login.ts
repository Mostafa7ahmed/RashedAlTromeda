import { Component } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveModeuls, NgxIntlTelInputModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss', '../../../Shared/CSS/input.scss']
})
export class Login {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
form: FormGroup;



  passwordFieldType: boolean = true;
  submitted = false;
  result: any = null;

  constructor(private fb: FormBuilder, private loginService: LoginService , private router: Router) {
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
      phone: phoneInput.e164Number,  
      password: password,
    };

    this.loginService.login(body).subscribe({
      next: (response) => {
        this.result = response;
        this.loginService.saveToken(response.result.accessToken);
        console.log('تم تسجيل الدخول بنجاح', response);
          this.router.navigate(['/'] );
      },
      error: (error) => {
        console.error('خطأ في تسجيل الدخول', error);
      }
    });

 
  }
}
