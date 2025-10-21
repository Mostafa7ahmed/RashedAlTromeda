import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
   theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (saved) {
      this.setTheme(saved);
    } else {
      this.applyClass(this.theme());
    }

    effect(() => {
      localStorage.setItem('app-theme', this.theme());
    });
  }

  private applyClass(t: 'light' | 'dark') {
    if (t === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  setTheme(t: 'light' | 'dark') {
    this.theme.set(t);
    this.applyClass(t);
    console.log('[ThemeService] setTheme ->', t);
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }
}
