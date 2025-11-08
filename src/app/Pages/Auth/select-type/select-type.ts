import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-select-type',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './select-type.html',
  styleUrl: './select-type.scss'
})
export class SelectType {
  types = [
    { type: 2,name: 'SELECT_TYPE.CLIENT', icon: 'Icons/Customer Survey-rafiki.svg' },
    { type: 1, name: 'SELECT_TYPE.ENGINEER', icon: 'Icons/Software engineer-bro (1).svg' },
    { type: 3,name: 'SELECT_TYPE.COMPANY', icon: 'Icons/Business ethics-cuate (1).svg' },
    { type: 4,  name: 'SELECT_TYPE.CENTER', icon: 'Icons/Customer Survey-rafiki.svg' }
  ];
}
