import { Component, inject } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { Theme } from '../../../Core/service/theme';
import { LoginService } from '../../../Core/service/login';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myporfile',
  imports: [HeaderPages , RouterLink],
  templateUrl: './myporfile.html',
  styleUrl: './myporfile.scss'
})
export class Myporfile {
  themeService = inject(Theme);
  _login = inject(LoginService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
  logout() {
    this._login.logout();
  }
}
