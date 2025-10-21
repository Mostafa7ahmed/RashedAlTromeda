import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkmoodBtn } from "../../components/darkmood-btn/darkmood-btn";
import { CommonModule } from '@angular/common';
import { Theme } from '../../Core/service/theme';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, DarkmoodBtn , CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
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
}
