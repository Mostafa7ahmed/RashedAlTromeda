import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss'
})
export class Testimonials {
@ViewChild('owlCar', { static: false }) owlCar!: CarouselComponent;

 customOptions: OwlOptions = {
    loop: true,
      margin: 20,
    nav: false,
    dots: false,
    rtl: true,
    autoplay: true,
    autoplayHoverPause:true,
    items:1,
    autoplayTimeout: 2000,
   
  };
  next() {
    console.log(this.owlCar.next()) 
  }

  prev() {
    this.owlCar.prev(); 
  }
  testimonials = [
    {
      name: 'جويل حويصى',
      role: 'بكالوريوس أعمال',
      text: 'تجربتي في هذه العيادة رائعة، كل شيء كان ممتاز. أشكر الطاقم المحترف.',
      img: 'Image/rating.png'
    },
    {
      name: 'محمد أحمد',
      role: 'مهندس برمجيات',
      text: 'خدمة ممتازة وطاقم متعاون جدًا. أنصح الجميع بالتعامل معهم.',
      img: 'Image/rating.png'
    }
  ];
}
