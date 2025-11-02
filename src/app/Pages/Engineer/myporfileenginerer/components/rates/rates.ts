import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Rate } from '../../../../../Core/service/rate';
import { IRate } from '../../../../../Core/Interface/irate';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rates',
  imports: [DatePipe],
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {
   private _rate = inject(Rate);




  userName = '';
  userImage = 'Icons/logoNavbar.svg';

  baseUrl: string = environment.baseUrl;
  engineerRate = signal<IRate[]>([]);
  newText = signal('');
  newRate = signal(0);

  ngOnInit() {
      this.loadRates();

  }

  loadRates() {
    this._rate.getAllRates().subscribe({
      next: (res) => {
        this.engineerRate.set(res.result);
      },
      error: (err) => console.error(err),
    });
  }



  getRandomLikes(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}
