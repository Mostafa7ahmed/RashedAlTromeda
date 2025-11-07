import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private storedTheme = localStorage.getItem('theme') || 'light';
  currentTheme = this.storedTheme;
  themeSignal = signal(this.storedTheme);
  isDarkMode = signal(this.storedTheme === 'dark');
  constructor() {
    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.isDarkMode.set(this.currentTheme === 'dark');

    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');


    this.themeSignal.set(this.currentTheme);
  }
}
