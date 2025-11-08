import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Center } from '../../../Core/service/engineer/center';
import { ICenter } from '../../../Core/Interface/iorganization';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Facility } from '../../../Core/service/engineer/facility';
import { IFacility } from '../../../Core/Interface/ifacility';
import { TranslatePipe } from '@ngx-translate/core';
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
  imports: [CommonModule , TranslatePipe],
  templateUrl: './center-details.html',
  styleUrl: './center-details.scss'
})
export class CenterDetails {
  activeTab = signal<'services' | 'products'>('services');


  private _orgService = inject(Center);
  private _facility = inject(Facility);
  serviceCards = signal<IFacility[]>([]);

  productCards = signal<IFacility[]>([]);
  centerDate = signal<ICenter | null>(null);
  private _route = inject(ActivatedRoute);
  centerId = signal<number | null>(null);
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    const serviceId = Number(this._route.snapshot.paramMap.get('id'));
    if (serviceId) {
      this.centerId.set(serviceId);
      console.log('Center ID:', serviceId);
      this.loadOrganization(serviceId);
      this.loadPorducts(serviceId)
      this.loadService(serviceId)

    }
  }

  loadOrganization(id: number) {
    this._orgService.getOneCenter(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.centerDate.set(res.result);
        }
      },
      error: (err) => console.error(err)
    });
  }
  loadPorducts(id: number) {
    this._facility.getFacilities(id, 0, 1, 50).subscribe({
      next: (res) => {
        if (res.success) {
          this.productCards.set(res.result);
        }
      },
      error: (err) => console.error(err)
    });
  }
  loadService(id: number) {
    this._facility.getFacilities(id, 1, 1, 50).subscribe({
      next: (res) => {
        if (res.success) {
          this.serviceCards.set(res.result);
        }
      },
      error: (err) => console.error(err)
    });
  }
getVisibleImage(card: any): string | null {
  const visible = card.gallaries?.find((g: any) => g.show);
  return visible ? this.baseUrl + visible.photo : null;
}

  switchTab(tab: 'services' | 'products') {
    this.activeTab.set(tab);
  }
}
