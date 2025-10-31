import { Component } from '@angular/core';
import { NavbarCustomer } from "../navbar-customer/navbar-customer";
import { Footer } from "../../footer/footer";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout-coustomer',
  imports: [NavbarCustomer, Footer , RouterModule],
  templateUrl: './main-layout-coustomer.html',
  styleUrl: './main-layout-coustomer.scss'
})
export class MainLayoutCoustomer {

}
