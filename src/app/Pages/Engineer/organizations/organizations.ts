import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IOrganization } from '../../../Core/Interface/iorganization';
import { OrganizationEngineer } from '../../../Core/service/engineer/organization';

@Component({
  selector: 'app-organizations',
  imports: [RouterModule],
  templateUrl: './organizations.html',
  styleUrl: './organizations.scss'
})
export class Organizations {


 private _categoryService = inject(OrganizationEngineer);

  baseUrl = environment.baseUrl;
  organizations = signal<IOrganization[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalCount = signal<number>(0);
  moveNext = signal<boolean>(false);
  movePrevious = signal<boolean>(false);
  pageSize = 12;
  isLoading = signal<boolean>(false);
searchTerm = signal('');

  ngOnInit(): void {
    this.loadCategories();
  }

loadCategories() {
  this.isLoading.set(true);

  this._categoryService
    .getOrganization(this.currentPage(), this.pageSize, this.searchTerm())
    .subscribe({
      next: (res) => {
        this.organizations.set(res.result || []);
        this.totalPages.set(res.totalPages);
        this.totalCount.set(res.totalCount);
        this.moveNext.set(res.moveNext);
        this.movePrevious.set(res.movePrevious);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.isLoading.set(false);
      },
    });
}
timeoutId: any;

onSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(() => {
    this.searchTerm.set(value);
    this.loadCategories();
  }, 500); 
}
  nextPage() {
    if (this.moveNext()) {
      this.currentPage.update(v => v + 1);
      this.loadCategories();
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
      this.loadCategories();
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.loadCategories();
  }

}
