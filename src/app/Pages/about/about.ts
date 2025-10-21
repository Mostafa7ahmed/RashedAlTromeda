import { Component, signal } from '@angular/core';
import { BookBtn } from "../../components/book-btn/book-btn";

@Component({
  selector: 'app-about',
  imports: [BookBtn],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  buttonLabel = signal('احجز خدمتك الآن');
  buttonColor = signal('#ff7a00');
  buttonColorText = signal('#FFF');

 explorLabel = signal('استكشف المزيد');
 contactLabel = signal('تواصل معنا ');

    rates = [
    {
      icon: 'Icons/target.svg',
      title: 'مهمتنا',
      text: 'نحن نعمل على جعل صيانة منزلك أسهل وأسرع من أي وقت مضى، من خلال تقديم خدمات موثوقة على يد فنيين محترفين.',
    },
    {
      icon: 'Icons/Mission Achieved.svg',
      title: 'رؤيتنا',
      text: 'أن نصبح الوجهة الأولى لخدمات الصيانة المنزلية الموثوقة، بتقديم حلول دقيقة وسريعة تحافظ على راحة منزلك وجودته.',
    },
    {
      icon: 'Icons/Mission.svg',
      title: 'قيمنا',
      text: 'نسعى أن نكون الخيار الأول لكل من يبحث عن خدمات صيانة شاملة بأعلى جودة وسرعة في التنفيذ وأسعار تناسب الجميع.',
    },
  ];
    features = [
    'خدمات صيانة منزلية يومية متكاملة.',
    'خدمات متخصصة وحلول فنية احترافية لكل احتياجات منزلك.',
    'نصائح صوتية وإرشادات عملية للعناية بمنزلك والحفاظ على تجهيزاته في أفضل حالة.',
    'تقارير ميدانية مصورة توضح خطوات الصيانة وجودة تنفيذ الخدمات في منزلك.',
    'نشر تقارير دورية نصف سنوية توضح أداء الخدمات وتطور أساليب الصيانة لتحسين تجربة العملاء باستمرار.',
  ];

}
