import { Component, effect, inject, input, signal } from '@angular/core';

import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { SerciceCategory } from '../../../Core/service/sercice-category';
import { IService } from '../../../Core/Interface/icategory';
import { ActivatedRoute } from '@angular/router';
import { ShortenPipe } from '../../../Shared/pipes/shorten-pipe';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-service',
  imports: [ReactiveModeuls , ShortenPipe],
  templateUrl: './service.html',
  styleUrl: './service.scss'
})
export class Service {
  
  private _serviceCategory = inject(SerciceCategory);
  private _route = inject(ActivatedRoute);
  // signals
  services = signal<IService[]>([]);
  isLoading = signal<boolean>(false);
  categoryId = signal<number>(0);
 baseurl =environment.baseUrl
  constructor() {
    effect(() => {
      const id = Number(this._route.snapshot.paramMap.get('categoryId')) || 0;
      if (id !== this.categoryId()) {
        this.categoryId.set(id);
        this.loadServices(id);
      }
    });
  }

  loadServices(categoryId: number) {
    this.isLoading.set(true);
    this._serviceCategory.getServiceFromCategories(1, 10, categoryId).subscribe({
      next: (res) => {
        this.services.set(res.result); 
        console.log(res)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.isLoading.set(false);
      }
    });
  }
}
