import { Component, signal } from '@angular/core';
interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}
@Component({
  selector: 'app-worker-profile',
  imports: [],
  templateUrl: './worker-profile.html',
  styleUrl: './worker-profile.scss'
})
export class WorkerProfile {
  experiences = signal([
    {
      color: 'purple',
      icon: 'Icons/worker.svg',
      isImage: true,
      value: '4',
      label: 'جميع الخدمات'
    },
    {
      color: 'blue',
      icon: 'fa-regular fa-star',
      isImage: false,
      value: '15 عام',
      label: 'خبرة'
    },
    {
      color: 'Orange',
      icon: 'fa-regular fa-star',
      isImage: false,
      value: '4.5',
      label: 'تقييم'
    }
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
    const exists = current.some(s => s.id === service.id);

    if (exists) {
      this.selectedServices.set(current.filter(s => s.id !== service.id));
    } else {
      this.selectedServices.set([...current, service]);
    }
  }

  isSelected(service: Service): boolean {
    return this.selectedServices().some(s => s.id === service.id);
  }
}
