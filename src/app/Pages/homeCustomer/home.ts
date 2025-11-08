import { Component, signal } from '@angular/core';
import { BookBtn } from '../../components/book-btn/book-btn';
import { Features } from '../../components/features/features';
import { CardsServies } from '../../components/cards-servies/cards-servies';
import { Testimonials } from '../../components/testimonials/testimonials';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home-customer',
  imports: [BookBtn, TranslatePipe, Features , Testimonials],
  templateUrl: './home.html',
  styleUrl: '../home/home.scss'
})
export class HomeCustomer {
  buttonLabel = signal('احجز موعدك');
color = 'var(--color-orange-dark)';
  buttonColorText = signal('#FFF');
}
