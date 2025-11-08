import { Component, inject } from '@angular/core';
import { Theme } from '../../../Core/service/theme';
import { DarkmoodBtn } from "../../../components/darkmood-btn/darkmood-btn";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDecode } from '../../../Core/Interface/idecode';
import { LoginService } from '../../../Core/service/login';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../Core/service/translation-service';

@Component({
  selector: 'app-navbar-center',
  imports: [RouterModule, DarkmoodBtn, CommonModule , TranslatePipe],
  templateUrl: './navbar-center.html',
  styleUrl: '../../../Shared/CSS/nav.scss'
})
export class NavbarCenter {
    private _user = inject(LoginService);
  private _theme = inject(Theme);
  private _translate = inject(TranslationService);

  baseUrl: string = environment.baseUrl;
  menuOpen = false;
  userImage = 'https://randomuser.me/api/portraits/men/32.jpg';
  dropdownOpen = false;
  isLogin = false;

  languages = this._translate.languages;
  selectedLang =
    this.languages.find((l) => l.code === this._translate.currentLanguage) ||
    this.languages[1];

  get isDarkMode(): boolean {
    return this._theme.isDarkMode();
  }

  ngOnInit() {
    const user = this._user.getUser() as IDecode | null;
    this.isLogin = !!user;

    if (user?.PhotoUrl) {
      this.userImage = `${this.baseUrl}${user.PhotoUrl}`;
    }
  }

  selectLanguage(lang: any) {
    this.selectedLang = lang;
    this._translate.setLanguage(lang.code);
    this.dropdownOpen = false;
  }


}
