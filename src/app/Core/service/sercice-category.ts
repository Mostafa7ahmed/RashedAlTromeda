import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { IPaginationResponse } from '../../Shared/Interface/iresonse';
import { IService } from '../Interface/icategory';

@Injectable({
  providedIn: 'root'
})
export class SerciceCategory {
  private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}service/paginate`;

  getServiceFromCategories(
    pageIndex = 1,
    pageSize = 10,
    categoryId:number = 0,
    sortDirection = 0

  ): Observable<IPaginationResponse<IService>> {
    const url = `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=${categoryId}&sortDirection=${sortDirection}`;
    return this._http.get<IPaginationResponse<IService>>(url);
  }
}
