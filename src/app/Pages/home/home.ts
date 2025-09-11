import { Component, signal } from '@angular/core';
import { BookBtn } from "../../components/book-btn/book-btn";
import { Features } from "../../components/features/features";
import { CardsServies } from "../../components/cards-servies/cards-servies";
import { Testimonials } from "../../components/testimonials/testimonials";

@Component({
  selector: 'app-home',
  imports: [BookBtn, Features, CardsServies, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  buttonLabel = signal('احجز موعدك');
  buttonColor = signal('#ff7a00');
  buttonColorText = signal('#FFF');
}
