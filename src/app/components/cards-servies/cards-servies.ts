import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cards-servies',
  imports: [],
  templateUrl: './cards-servies.html',
  styleUrl: './cards-servies.scss'
})
export class CardsServies {
    number = input<number>(4);

  services = [
    { title: 'طلاء الحائط', icon: 'Icons/Chisel.svg', image: 'Image/plumbing.png' },
    { title: 'السباكة',  icon: 'Icons/repair.svg', image: 'Image/house-repair.png' },
    { title: 'نجارة',  icon: 'Icons/Chisel.svg', image: 'Image/carpentry.png' },
    { title: 'تجميع الأثاث',  icon: 'Icons/Chisel.svg', image: 'Image/furniture-assembly.png' },
    { title: 'تنظيف البيت',  icon: 'Icons/Chisel.svg', image: 'Image/house-cleaning.png' },
    { title: 'صيانة المنزل',  icon: 'Icons/Chisel.svg', image: 'Image/reduies1.png' },
     { title: 'طلاء الحائط', icon: 'Icons/Chisel.svg', image: 'Image/plumbing.png' },
    { title: 'السباكة',  icon: 'Icons/repair.svg', image: 'Image/house-repair.png' },
    { title: 'نجارة',  icon: 'Icons/Chisel.svg', image: 'Image/carpentry.png' },
    { title: 'تجميع الأثاث',  icon: 'Icons/Chisel.svg', image: 'Image/furniture-assembly.png' },
    { title: 'تنظيف البيت',  icon: 'Icons/Chisel.svg', image: 'Image/house-cleaning.png' },
    { title: 'صيانة المنزل',  icon: 'Icons/Chisel.svg', image: 'Image/reduies1.png' },
     { title: 'طلاء الحائط', icon: 'Icons/Chisel.svg', image: 'Image/plumbing.png' },
    { title: 'السباكة',  icon: 'Icons/repair.svg', image: 'Image/house-repair.png' },
    { title: 'نجارة',  icon: 'Icons/Chisel.svg', image: 'Image/carpentry.png' },
    { title: 'تجميع الأثاث',  icon: 'Icons/Chisel.svg', image: 'Image/furniture-assembly.png' },
    { title: 'تنظيف البيت',  icon: 'Icons/Chisel.svg', image: 'Image/house-cleaning.png' },
    { title: 'صيانة المنزل',  icon: 'Icons/Chisel.svg', image: 'Image/reduies1.png' },
  ];
}
