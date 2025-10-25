import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-type',
  imports: [RouterLink],
  templateUrl: './select-type.html',
  styleUrl: './select-type.scss'
})
export class SelectType {
  types = [
    { type: 2, name: 'Customer', icon: 'Icons/Customer Survey-rafiki.svg' },
    { type: 1, name: 'Engineer', icon: 'Icons/Software engineer-bro (1).svg' },
    { type: 3, name: 'Organizations', icon: 'Icons/Business ethics-cuate (1).svg' },
    { type: 4, name: 'Center', icon: 'Icons/Customer Survey-rafiki.svg' }
  ];
}
