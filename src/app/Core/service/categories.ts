import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { IPaginationResponse } from '../../Shared/Interface/iresonse';
import { ICategory } from '../Interface/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}category/paginate`;

getCategories(
  pageIndex = 1,
  pageSize = 10,
  search = '',
  sortDirection = 0
): Observable<IPaginationResponse<ICategory>> {
  const url = `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&sortDirection=${sortDirection}`;
  return this._http.get<IPaginationResponse<ICategory>>(url);
}
}