import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders {
    baseUrl =environment.baseUrl
   services = Array(9).fill({
    title: 'سباكة',
    location: 'القاهرة، مدينة نصر',
    distance: 10,
    date: '14 أكتوبر 2025',
    image: 'Image/bgAuth.jpg',
  });
}
