import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
 // Get saved theme or default to light
  private storedTheme = localStorage.getItem('theme') || 'light';
  currentTheme = this.storedTheme;
  themeSignal = signal(this.storedTheme);

  constructor() {
    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);

    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');

    this.themeSignal.set(this.currentTheme);
  }
}
