import { Component, inject } from '@angular/core';
import { Theme } from '../../../Core/service/theme';
import { DarkmoodBtn } from "../../../components/darkmood-btn/darkmood-btn";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDecode } from '../../../Core/Interface/idecode';
import { LoginService } from '../../../Core/service/login';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar-center',
  imports: [RouterModule, DarkmoodBtn , CommonModule],
  templateUrl: './navbar-center.html',
  styleUrl: '../../../Shared/CSS/nav.scss'
})
export class NavbarCenter {
    private _user = inject(LoginService);
  baseUrl: string = environment.baseUrl;
  menuOpen = false; 

  userImage = 'Icons/logoNavbar.svg';
 languages = [
    { code: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/eg.svg' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/gb.svg' },
    { code: 'pk', name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg' }
  ];
  
  selectedLang = this.languages[0];
  dropdownOpen = false;

  selectLanguage(lang: any) {
    this.selectedLang = lang;
    this.dropdownOpen = false;
  }

    themeService = inject(Theme);

  toggleTheme() {
    this.themeService.toggleTheme();
  }

    ngOnInit() {
      const user = this._user.getUser() as IDecode | null;
      if (user) {
        this.userImage =  user.PhotoUrl
          ? `${this.baseUrl}${user.PhotoUrl}`
          : 'Icons/logoNavbar.svg';
      }
  
     
    }
}
