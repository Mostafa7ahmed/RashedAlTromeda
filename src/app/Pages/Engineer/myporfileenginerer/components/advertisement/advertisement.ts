import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveModeuls } from '../../../../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-advertisement',
  imports: [ TranslatePipe, ReactiveModeuls],
  templateUrl: './advertisement.html',
  styleUrl: './advertisement.scss'
})
export class Advertisement {
items = [
  {
    date: '14 أكتوبر, 2025',
    price: 45,
    title: 'اسم الاعلان',
    discount: 10,
    image: 'Image/aboutBG.jpg' // ضع مسار الصورة هنا
  },
    {
    date: '14 أكتوبر, 2025',
    price: 45,
    title: 'اسم الاعلان',
    discount: 10,
    image: 'Image/aboutBG.jpg' // ضع مسار الصورة هنا
  },
    {
    date: '14 أكتوبر, 2025',
    price: 45,
    title: 'اسم الاعلان',
    discount: 10,
    image: 'Image/aboutBG.jpg' // ضع مسار الصورة هنا
  },

  // كرر حسب الحاجة
];
}
