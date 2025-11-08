import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { SweetAlert } from '../../../Core/service/sweet-alert';
import { UpdatePassword } from '../../../Core/service/update-password';
import { IChangePassword } from '../../../Core/Interface/idecode';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-changepassword',
  imports: [ ReactiveModeuls , TranslatePipe],
  templateUrl: './changepassword.html',
  styleUrl: './changepassword.scss'
})
export class Changepassword {
 form: FormGroup;
  hideOld = signal(true);
  hideNew = signal(true);
  hideConfirm = signal(true);

  constructor(
    private fb: FormBuilder,
    private alert: SweetAlert,
    private _updatePassword: UpdatePassword
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmedNewPassword: ['', Validators.required],
    });
  }

  toggle(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.hideOld.set(!this.hideOld());
    if (field === 'new') this.hideNew.set(!this.hideNew());
    if (field === 'confirm') this.hideConfirm.set(!this.hideConfirm());
  }

  submit() {
    if (this.form.valid) {
      const body: IChangePassword = this.form.value;

      this._updatePassword.updatePassword(body).subscribe({
        next: (res) => {
          this.alert.toast(res.message || 'تم تغيير كلمة المرور بنجاح ✅', 'success');
          this.form.reset();
        },
        error: (err) => {
          this.alert.toast(err.error?.message || 'حدث خطأ أثناء تغيير كلمة المرور ❌', 'error');
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
