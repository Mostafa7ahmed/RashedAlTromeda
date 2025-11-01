import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organizations',
  imports: [RouterModule],
  templateUrl: './organizations.html',
  styleUrl: './organizations.scss'
})
export class Organizations {
organizations = [
  {
    id: 1,
    name: 'منظمة الهلال الأحمر المصري',
    type: 'خيرية',
    location: 'القاهرة، مصر',
    established: 1911,
    image: 'Image/org.jpg',
    description: 'تقدم خدمات الإغاثة والمساعدة الإنسانية والطبية في جميع أنحاء مصر.',
  },
  {
    id: 2,
    name: 'مؤسسة مصر الخير',
    type: 'تنموية',
    location: 'الجيزة، مصر',
    established: 2007,
    image: 'Image/org.jpg',
    description: 'تهدف إلى تنمية الإنسان في مجالات التعليم والصحة والبحث العلمي والتكافل الاجتماعي.',
  },
  {
    id: 3,
    name: 'جمعية رسالة للأعمال الخيرية',
    type: 'خيرية',
    location: 'القاهرة، مصر',
    established: 1999,
    image: 'Image/org.jpg',
    description: 'تسعى لنشر ثقافة العمل التطوعي وتقديم المساعدات للفئات الأكثر احتياجًا.',
  },
  {
    id: 4,
    name: 'مؤسسة بهية لعلاج سرطان الثدي',
    type: 'صحية',
    location: 'الجيزة، مصر',
    established: 2015,
    image: 'Image/org.jpg',
    description: 'مؤسسة غير هادفة للربح متخصصة في الكشف المبكر وعلاج سرطان الثدي للسيدات مجانًا.',
  },
  {
    id: 5,
    name: 'مؤسسة مجدي يعقوب للقلب',
    type: 'طبية',
    location: 'أسوان، مصر',
    established: 2009,
    image: 'Image/org.jpg',
    description: 'تقدم خدمات جراحات القلب المجانية للأطفال والكبار وتدعم الأبحاث الطبية.',
  },
];

}
