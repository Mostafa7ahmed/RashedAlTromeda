import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
interface Feature {
  icon: string; // مسار الصورة أو الأيقونة
  text: string; // نص الميزة حسب اللغة
}
@Component({
  selector: 'app-features',
  imports: [CommonModule , TranslatePipe],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features {
  // signal لتخزين المميزات بعد الترجمة
  features = signal<Feature[]>([]);

  constructor(private translate: TranslateService) {
    this.loadFeatures();
    
    // إذا تغيرت اللغة، يتم إعادة تحميل النصوص
    this.translate.onLangChange.subscribe(() => this.loadFeatures());
  }

  loadFeatures() {
    this.translate.get('features').subscribe((res: Feature[]) => {
      this.features.set(res);
    });
  }
}
