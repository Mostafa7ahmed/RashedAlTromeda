import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface Review {
  name: string;
  rate: number;
  text: string;
  date: string;
  image: string;
  likes?: number;
}
@Component({
  selector: 'app-worker-profile',
  imports: [CommonModule],
  templateUrl: './worker-profile.html',
  styleUrl: './worker-profile.scss',
})
export class WorkerProfile {
  isExpanded = false;

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
  experiences = signal([
    {
      color: 'purple',
      icon: 'Icons/worker.svg',
      isImage: true,
      value: '4',
      label: 'جميع الخدمات',
    },
    {
      color: 'blue',
      icon: 'fa-regular fa-star',
      isImage: false,
      value: '15 عام',
      label: 'خبرة',
    },
    {
      color: 'Orange',
      icon: 'fa-regular fa-star',
      isImage: false,
      value: '4.5',
      label: 'تقييم',
    },
  ]);

  services = signal<Service[]>([
    { id: 1, name: 'نجارة', price: 5000, image: 'Image/covdermask.png' },
    { id: 2, name: 'حدادة', price: 4000, image: 'Image/covdermask.png' },
    { id: 3, name: 'سباكة', price: 3000, image: 'Image/covdermask.png' },
    { id: 4, name: 'دهان', price: 2000, image: 'Image/covdermask.png' },
  ]);

  selectedServices = signal<Service[]>([]);
  toggleService(service: Service) {
    const current = this.selectedServices();
    const exists = current.some((s) => s.id === service.id);

    if (exists) {
      this.selectedServices.set(current.filter((s) => s.id !== service.id));
    } else {
      this.selectedServices.set([...current, service]);
    }
  }
  totalPrice = computed(() => this.selectedServices().reduce((sum, s) => sum + s.price, 0));
  isSelected(service: Service): boolean {
    return this.selectedServices().some((s) => s.id === service.id);
  }

  days = [
    { id: 1, name: 'الأحد' },
    { id: 2, name: 'الإثنين' },
    { id: 3, name: 'الثلاثاء' },
    { id: 4, name: 'الأربعاء' },
    { id: 5, name: 'الخميس' },
    { id: 6, name: 'الجمعة' },
    { id: 7, name: 'السبت' },
    { id: 8, name: 'الأحد' },
    { id: 0, name: 'الأحد' },
    { id: 11, name: 'الإثنين' },
    { id: 13, name: 'الثلاثاء' },
    { id: 14, name: 'الأربعاء' },
    { id: 15, name: 'الخميس' },
    { id: 16, name: 'الجمعة' },
    { id: 17, name: 'السبت' },
    { id: 18, name: 'الأحد' },
    { id: 24, name: 'الأربعاء' },
    { id: 25, name: 'الخميس' },
    { id: 26, name: 'الجمعة' },
    { id: 27, name: 'السبت' },
    { id: 28, name: 'الأحد' },
  ];

  selectedDay = signal<number>(1);

  selectDay(id: number) {
    this.selectedDay.set(id);
  }

  reviews = signal<Review[]>([
    {
      name: 'عمرو يونس',
      rate: 4.6,
      date: '20 أغسطس 2025',
      text: 'لقد اتصلت بسباك ليصلح تسرب في المطبخ، وقد وصلوا في نفس اليوم!',
      likes: 26,
      image: 'Image/covdermask.png',
    },
    {
      name: 'سارة محمد',
      rate: 4.8,
      date: '18 أغسطس 2025',
      text: 'الخدمة كانت رائعة وسريعة جدًا، أنصح بهم بشدة.',
      likes: 42,
      image: 'Image/covdermask.png',
    },
    {
      name: 'أحمد علي',
      rate: 4.5,
      date: '15 أغسطس 2025',
      text: 'العمال محترمين والشغل نظيف جدًا.',
      likes: 31,
      image: 'Image/covdermask.png',
    },
    {
      name: 'ليلى حسن',
      rate: 5.0,
      date: '10 أغسطس 2025',
      text: 'تجربة ممتازة من البداية للنهاية!',
      likes: 57,
      image: 'Image/covdermask.png',
    },
    {
      name: 'محمود إبراهيم',
      rate: 4.3,
      date: '5 أغسطس 2025',
      text: 'الخدمة جيدة لكن كان في تأخير بسيط في المواعيد.',
      likes: 19,
      image: 'Image/covdermask.png',
    },
  ]);

  newText = signal('');
  newRate = signal(0);
  userImage = 'Image/covdermask.png';
  userName = 'أنت';
  addReview() {
    if (!this.newText() || this.newRate() === 0) return;

    const today = new Date().toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    this.reviews.update((arr) => [
      ...arr,
      {
        name: this.userName,
        rate: this.newRate(),
        text: this.newText(),
        date: today,
        image: this.userImage,
      },
    ]);

    this.newText.set('');
    this.newRate.set(0);
  }



  print() {
    console.log("Day ==>" + this.selectedDay());
    console.log("Select Serviece == > ")

    console.log(this.selectedServices())
  }
}
