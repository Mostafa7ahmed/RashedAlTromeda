import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Streem } from '../../../../../Core/service/streem';
import { SweetAlert } from '../../../../../Core/service/sweet-alert';
import { environment } from '../../../../../../environments/environment';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';
import { Facility } from '../../../../../Core/service/engineer/facility';
import { AddProdcutFacility } from '../../../../../Core/Interface/ifacility';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveModeuls , TranslatePipe],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss', '.././../../../../Shared/CSS/popup.scss']
})
export class AddProduct {
  private router = inject(Router);
  private _streem = inject(Streem);
  private _suggest = inject(Facility);
  private fb = inject(FormBuilder);
  private _alert = inject(SweetAlert);

  baseUrl = environment.baseUrl;

  images = signal<{ id?: number; url?: string; isUploading: boolean; show: boolean }[]>([]);
  isUploading = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  closePopup() {
    this.router.navigate([{ outlets: { popup: null } }]);
  }

onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  Array.from(input.files).forEach(file => {
    const isFirstImage = this.images().length === 0;
    const tempImg = { isUploading: true, show: isFirstImage };
    this.images.update(prev => [...prev, tempImg]);

    this._streem.uploadStreem(file).subscribe({
      next: res => {
        if (res.success && res.result) {
          this.images.update(prev => prev.map(img =>
            img === tempImg ? { id: res.result.id, url: res.result.url, isUploading: false, show: tempImg.show } : img
          ));
        }
      },
      error: () => {
        this.images.update(prev => prev.filter(img => img !== tempImg));
      }
    });
  });
}

  removeImage(index: number): void {
    const imgs = [...this.images()];
    const img = imgs[index];
    if (img?.id) {
      this._streem.deleteStreem(img.id).subscribe({
        next: () => {
          imgs.splice(index, 1);
          this.images.set(imgs);
        }
      });
    }
  }
  selectOnlyThis(index: number) {
    this.images.update(prev => prev.map((img, i) => ({
      ...img,
      show: i === index ? true : false
    })));
  }
  add(): void {
    if (this.form.invalid) return;

    const payload: AddProdcutFacility = {
      ...this.form.value,
      gallaries: this.images().map(img => ({
        photo: img.url,
        show: img.show ?? false
      })),
      type: 0,
      price: this.form.value.price
    };

    console.log(payload);

    this._suggest.addFacility(payload).subscribe({
      next: (res) => {
        console.log('Facility created:', res)
        this._alert.toast(res.message || 'تم إنشاء الحساب بنجاح ✅', 'success');
      this.images.set([]);
      this.form.reset();
      },
      error: (err) => this._alert.toast(err.error?.message || 'فشل إرسال رمز التحقق ❌', 'error')

    })
  }
}
