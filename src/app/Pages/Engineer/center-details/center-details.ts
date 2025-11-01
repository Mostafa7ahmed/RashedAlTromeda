import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
interface Card {
  title: string;
  location: string;
  hours: string;
  rate: number;
  reviews: number;
  image: string;
}
@Component({
  selector: 'app-center-details',
  imports: [CommonModule],
  templateUrl: './center-details.html',
  styleUrl: './center-details.scss'
})
export class CenterDetails {
  activeTab = signal<'services' | 'products'>('services');

  serviceCards = signal([
    {
      title: 'كويت فكس السباكة - دوانتاون',
      location: '123 شارع أحمد - دوانتاون، حي',
      hours: '03 ساعات',
      rate: 4.6,
      reviews: 762,
      image: 'Image/center.jpg',
    },
    {
      title: 'كويت فكس الكهرباء - العاصمة',
      location: '45 شارع التحرير - العاصمة، حي',
      hours: '02 ساعات',
      rate: 4.7,
      reviews: 654,
      image: 'Image/center.jpg',
    },
  ]);

  productCards = signal([
    {
      title: 'منتج مقبض الطاقة المميزة',
      description: 'طقم متكامل بجودة عالية لتوفير الأداء الأمثل.',
      rate: 4.6,
      reviews: 762,
      image: 'Image/center.jpg',
    },
    {
      title: 'منتج تقني متطور',
      description: 'مميزات متقدمة وتصميم أنيق يناسب احتياجاتك اليومية.',
      rate: 4.8,
      reviews: 940,
      image: 'Image/center.jpg',
    },
  ]);

  switchTab(tab: 'services' | 'products') {
    this.activeTab.set(tab);
  }
}
