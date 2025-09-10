import { Component, signal } from '@angular/core';
import { BookBtn } from "../../components/book-btn/book-btn";
import { Features } from "../../components/features/features";

@Component({
  selector: 'app-home',
  imports: [BookBtn, Features],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  buttonLabel = signal('احجز موعدك');
  buttonColor = signal('#ff7a00');
  buttonColorText = signal('#FFF');
}
