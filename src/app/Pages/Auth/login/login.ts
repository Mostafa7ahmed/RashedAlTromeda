import { Component } from '@angular/core';
import { LoginService } from '../../../Core/service/login';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-login',
  imports: [...ReactiveModeuls],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
   loginForm: any; 

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe((res: any) => {
          this.loginService.saveToken(res.token);
          console.log('Logged in successfully ✅');
        });
    }
  }

  onCheckUser() {
    console.log('Decoded User:', this.loginService.getUser());
    console.log('Is Logged In:', this.loginService.isLoggedIn());
  }
}
