import { Component, signal } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert } from '../../../Core/service/sweet-alert';
import { IDecode } from '../../../Core/Interface/idecode';

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
  isLoading = signal(false);

  constructor(private fb: FormBuilder, private aleart: SweetAlert, private loginService: LoginService, private route: ActivatedRoute
    , private router: Router) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: 0
    });
  }



  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
  setWelcomeText(type: number) {
    switch (type) {
      case 1:
        this.welcomeText = ' بالمهندس';
        break;
      case 2:
        this.welcomeText = ' بالعميل';
        break;
      case 3:
        this.welcomeText = ' بالمؤسسة';
        break;
      case 4:
        this.welcomeText = ' بالمركز';
        break;
      default:
        this.welcomeText = ' بعودتك';
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

      this.aleart.toast('لم يتم اختيار كود الدولة', 'warning');
      return;
    }

    const body = {
      phone: phoneInput.e164Number,
      password: password,
      type: this.type
    };
    this.isLoading.set(true);

   this.loginService.login(body).subscribe({
  next: (response) => {
    this.isLoading.set(false);
    this.result = response;
    const { accessToken, refreshToken } = response.result;
      
    this.loginService.saveTokens(accessToken, refreshToken);
       const user = this.loginService.getUser() as IDecode | null;
  
      localStorage.setItem('user_type', user?.role || ''); 
    this.aleart.toast(response.message, 'success');
    this.router.navigate(['/']);
  },
  error: (error) => {
    this.isLoading.set(false);
    this.aleart.toast(error.error.message, 'error');
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
