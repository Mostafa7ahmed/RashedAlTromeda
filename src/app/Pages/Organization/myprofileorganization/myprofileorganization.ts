import { Component, inject } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { Theme } from '../../../Core/service/theme';
import { LoginService } from '../../../Core/service/login';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-myprofileorganization',
  imports: [RouterModule,TranslatePipe, HeaderPages],
  templateUrl: './myprofileorganization.html',
  styleUrls:[ './myprofileorganization.scss' ,  '../../../Shared/CSS/input.scss']
})
export class Myprofileorganization {
  _login = inject(LoginService);


  logout() {
    this._login.logout();
  }
}
