import { Component } from '@angular/core';
import { BookBtn } from "../../components/book-btn/book-btn";

@Component({
  selector: 'app-home',
  imports: [BookBtn],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
