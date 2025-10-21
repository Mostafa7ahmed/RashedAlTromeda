import { Component, inject } from '@angular/core';
import { Theme } from '../../Core/service/theme';

@Component({
  selector: 'app-darkmood-btn',
  imports: [],
  templateUrl: './darkmood-btn.html',
  styleUrl: './darkmood-btn.scss'
})
export class DarkmoodBtn {
  themeService = inject(Theme);

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
