import { Component, input } from '@angular/core';

@Component({
  selector: 'app-book-btn',
  imports: [],
  templateUrl: './book-btn.html',
  styleUrl: './book-btn.scss'
})
export class BookBtn {
  label = input<string>('احجز موعدك');
  background = input<string>('transparent');
  color = input<string>('#ff7a00');
}
