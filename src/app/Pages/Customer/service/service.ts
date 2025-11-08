import { Component, effect, inject, input, signal } from '@angular/core';

import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { SerciceCategory } from '../../../Core/service/sercice-category';
import { IService } from '../../../Core/Interface/icategory';
import { ActivatedRoute } from '@angular/router';
import { ShortenPipe } from '../../../Shared/pipes/shorten-pipe';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-service',
  imports: [ReactiveModeuls , ShortenPipe , TranslatePipe],
  templateUrl: './service.html',
  styleUrl: './service.scss'
})
export class Service {
  
  private _serviceCategory = inject(SerciceCategory);
  private _route = inject(ActivatedRoute);
  // signals
  services = signal<IService[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalCount = signal<number>(0);
  moveNext = signal<boolean>(false);
  movePrevious = signal<boolean>(false);
  pageSize =12;
  isLoading = signal<boolean>(false);  categoryId = signal<number>(0);
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
    this._serviceCategory.getServiceFromCategories(this.currentPage(), this.pageSize, categoryId).subscribe({
      next: (res) => {
        this.services.set(res.result); 
      this.totalPages.set(res.totalPages);
          this.totalCount.set(res.totalCount);
          this.moveNext.set(res.moveNext);
          this.movePrevious.set(res.movePrevious);
          this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.isLoading.set(false);
      }
    });
  }

    nextPage() {
    if (this.moveNext()) {
      this.currentPage.update(v => v + 1);
this.loadServices(this.categoryId());
    }
  }
get pagesArray() {
  return Array.from({ length: this.totalPages() });
}
get visiblePages() {
  const total = this.totalPages();
  const current = this.currentPage();
  const windowSize = 4;

  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - windowSize + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
  prevPage() {
    if (this.movePrevious()) {
      this.currentPage.update(v => v - 1);
this.loadServices(this.categoryId());
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
this.loadServices(this.categoryId());
  }
}
