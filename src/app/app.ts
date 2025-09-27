import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./Layout/navbar/navbar";
import { Footer } from './Layout/footer/footer';
import { Theme } from './Core/service/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

    constructor(public theme: Theme) {}

}
