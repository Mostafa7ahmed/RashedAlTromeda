import { Component } from '@angular/core';
import { Footer } from "../../footer/footer";
import { RouterModule } from '@angular/router';
import { NavbarOrganization } from '../navbar-organization/navbar-organization';

@Component({
  selector: 'app-main-layout-organization',
  imports: [NavbarOrganization, Footer , RouterModule],
  templateUrl: './main-layout-organization.html',
  styleUrl: './main-layout-organization.scss'
})
export class MainLayoutOrganization {

}
