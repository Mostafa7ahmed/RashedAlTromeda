import { Component, signal } from '@angular/core';
import { BookBtn } from '../../components/book-btn/book-btn';
import { Features } from '../../components/features/features';
import { Testimonials } from '../../components/testimonials/testimonials';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  imports: [BookBtn, Features, Testimonials , TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  buttonLabel = signal('احجز موعدك');
color = 'var(--color-orange-dark)';
  buttonColorText = signal('#FFF');
}
