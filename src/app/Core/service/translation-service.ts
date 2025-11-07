import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    // ✅ قائمة اللغات المتاحة
  readonly languages = [
    { code: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/eg.svg' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/gb.svg' },
    { code: 'pk', name: 'Urdu', flag: 'https://flagcdn.com/pk.svg' }
  ];

  // ✅ حفظ اللغة الحالية في إشارة (Signal)
  currentLang = signal<string>('ar');

  constructor(private translate: TranslateService) {
    const storedLang = localStorage.getItem('lang') || 'ar';
    this.setLanguage(storedLang);
  }

  // ✅ تبديل اللغة
  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.setDirection(lang);
  }

  // ✅ ضبط اتجاه الصفحة تلقائيًا
  private setDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }

  // ✅ جلب اللغة الحالية
  get currentLanguage() {
    return this.currentLang();
  }
}
