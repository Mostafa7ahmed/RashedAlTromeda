import { Component } from '@angular/core';
import { Footer } from "../../footer/footer";
import { RouterModule } from '@angular/router';
import { NavbarEngineer } from '../navbar-engineer/navbar-engineer';

@Component({
  selector: 'app-main-layout-engineer',
  imports: [NavbarEngineer, Footer , RouterModule],
  templateUrl: './main-layout-engineer.html',
  styleUrl: './main-layout-engineer.scss'
})
export class MainLayoutEngineer {

}
