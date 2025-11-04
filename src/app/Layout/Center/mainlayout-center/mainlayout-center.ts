import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarCenter } from "../navbar-center/navbar-center";
import { Footer } from "../../footer/footer";

@Component({
  selector: 'app-mainlayout-center',
  imports: [NavbarCenter,RouterModule, Footer],
  templateUrl: './mainlayout-center.html',
  styleUrl: './mainlayout-center.scss'
})
export class MainlayoutCenter {

}
