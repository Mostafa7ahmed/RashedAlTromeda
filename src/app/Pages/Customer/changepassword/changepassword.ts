import { Component, signal } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-changepassword',
  imports: [HeaderPages , ReactiveModeuls],
  templateUrl: './changepassword.html',
  styleUrl: './changepassword.scss'
})
export class Changepassword {
  form: FormGroup;
  hideOld = signal(true);
  hideNew = signal(true);
  hideConfirm = signal(true);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  toggle(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.hideOld.set(!this.hideOld());
    if (field === 'new') this.hideNew.set(!this.hideNew());
    if (field === 'confirm') this.hideConfirm.set(!this.hideConfirm());
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
