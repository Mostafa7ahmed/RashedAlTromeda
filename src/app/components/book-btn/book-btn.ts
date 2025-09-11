import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-btn',
  imports: [RouterModule],
  templateUrl: './book-btn.html',
  styleUrl: './book-btn.scss'
})
export class BookBtn {
  label = input<string>('احجز موعدك');
  background = input<string>('transparent');
  color = input<string>('#ff7a00');
  route = input<string | null>(null);
}
