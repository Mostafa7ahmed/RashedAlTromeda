import { Component, inject, input, signal } from '@angular/core';
import { ICategory } from '../../../Core/Interface/icategory';
import { environment } from '../../../../environments/environment';
import { ReactiveModeuls } from '../../../Shared/Modules/ReactiveForms.module';
import { CategorieService } from '../../../Core/service/categories';
@Component({
  selector: 'app-categories',
  imports: [ReactiveModeuls],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
 private _categoryService = inject(CategorieService);

  baseUrl = environment.baseUrl;
  categories = signal<ICategory[]>([]);
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
    .getCategories(this.currentPage(), this.pageSize, this.searchTerm())
    .subscribe({
      next: (res) => {
        this.categories.set(res.result || []);
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
