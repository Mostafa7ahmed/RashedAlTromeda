import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-authoutlet',
  imports: [RouterOutlet , TranslatePipe],
  templateUrl: './authoutlet.html',
  styleUrl: './authoutlet.scss'
})
export class Authoutlet {

}
