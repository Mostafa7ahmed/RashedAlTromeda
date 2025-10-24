import { Component } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { ActivatedRoute, Router } from '@angular/router';

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
  passwordFieldType = true;
  submitted = false;
  result: any = null;
  type: number = 0;
  welcomeText = 'مرحباً بعودتك';
  registerLink: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService ,     private route: ActivatedRoute
, private router: Router) {
      this.form = this.fb.group({
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    type:0
  });
  }
  


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
  setWelcomeText(type: number) {
    switch (type) {
      case 1:
        this.welcomeText = 'مرحباً بالمهندس';
        break;
      case 2:
        this.welcomeText = 'مرحباً بالعميل';
        break;
      case 3:
        this.welcomeText = 'مرحباً بالمؤسسة';
        break;
      case 4:
        this.welcomeText = 'مرحباً بالمركز';
        break;
      default:
        this.welcomeText = 'مرحباً بعودتك';
    }
  }
    setRegisterLink(type: number) {
    switch (type) {
      case 1:
        this.registerLink = '/auth/register/engineer';
        break;
      case 2:
        this.registerLink = '/auth/register/customer';
        break;
      case 3:
        this.registerLink = '/auth/register/organization';
        break;
      case 4:
        this.registerLink = null;
        break;
      default:
        this.registerLink = '/auth/register';
    }
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
      type: this.type
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

    ngOnInit() {
    this.type = Number(this.route.snapshot.paramMap.get('type')) || 0;
    this.form.patchValue({ type: this.type });
        this.setWelcomeText(this.type);
    this.setRegisterLink(this.type);

  }
}
