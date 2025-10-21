import { Component, inject } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { Theme } from '../../../Core/service/theme';
import { LoginService } from '../../../Core/service/login';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-myporfile',
  imports: [HeaderPages , RouterModule , RouterOutlet],
  templateUrl: './myporfile.html',
  styleUrls:[ './myporfile.scss', '../../../Shared/CSS/input.scss']
})
export class Myporfile {
  _login = inject(LoginService);


  logout() {
    this._login.logout();
  }
}
