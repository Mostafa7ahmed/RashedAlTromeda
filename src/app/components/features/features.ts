import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features {
  features = [
    {
      icon: 'Icons/Icon1.svg',
      text: 'خدمة عملاء متاحة دائماً للرد على استفساراتك وتلبية احتياجاتك'
    },
    {
      icon: 'Icons/Icon.svg',
      text: 'عمالة مدربة ممتازة وخبرة طويلة في إنجاز أعمال مختلفة'
    },
    {
      icon: 'Icons/Icon2.svg',
      text: 'نصل إليك في الوقت الذي تختاره دون تأخير، لأن وقتك غالي'
    },
    {
      icon: 'Icons/Icon3.svg',
      text: 'نقدم خدمات عالية المستوى باستخدام أدوات وطرق حديثة تضمن أفضل النتائج'
    }
  ];
}
