import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DarkmoodBtn } from '../../../components/darkmood-btn/darkmood-btn';
import { IDecode } from '../../../Core/Interface/idecode';
import { LoginService } from '../../../Core/service/login';
import { Theme } from '../../../Core/service/theme';
import { environment } from '../../../../environments/environment';
import { TranslationService } from '../../../Core/service/translation-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-customer',
  standalone: true,
  imports: [RouterModule, DarkmoodBtn, CommonModule , TranslatePipe],
  templateUrl: './navbar-customer.html',
  styleUrl: '../../../Shared/CSS/nav.scss'
})
export class NavbarCustomer {
  private _user = inject(LoginService);
  private _theme = inject(Theme);
  private _translate = inject(TranslationService); // ✅ خدمة الترجمة

  baseUrl: string = environment.baseUrl;
  menuOpen = false;
  userImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  dropdownOpen = false;

  // ✅ اللغات من الخدمة نفسها
  languages = this._translate.languages;

  // ✅ اللغة الحالية من الإشارة
  selectedLang = this.languages.find(
    (l) => l.code === this._translate.currentLanguage
  ) || this.languages[1]; // en افتراضيًا

  isDark = this._theme.isDarkMode;

  selectLanguage(lang: any) {
    this.selectedLang = lang;
    this._translate.setLanguage(lang.code); // ✅ تغيير اللغة فعليًا
    this.dropdownOpen = false;
  }

  get isDarkMode(): boolean {
    return this._theme.isDarkMode();
  }

  ngOnInit() {
    const user = this._user.getUser() as IDecode | null;
    if (user) {
      this.userImage = user.PhotoUrl
        ? `${this.baseUrl}${user.PhotoUrl}`
        : this.userImage;
    }

    console.log('Dark mode:', this._theme.isDarkMode());
    console.log('User:', user);
  }
}
