import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ICategory } from '../../Core/Interface/icategory';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { CategorieService } from '../../Core/service/categories';

@Component({
  selector: 'app-cards-servies',
  imports: [RouterLink],
  templateUrl: './cards-servies.html',
  styleUrl: './cards-servies.scss'
})
export class CardsServies implements OnInit {
    number = input<number>(6);
     private _categoryService = inject(CategorieService);
       categories = signal<ICategory[]>([]);
baseUrl = environment.baseUrl;


  loadCategories() {
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.result);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }
}
