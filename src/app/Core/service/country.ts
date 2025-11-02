import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../Shared/Interface/iresonse';
import { ICountry } from '../Interface/icountry';

@Injectable({
  providedIn: 'root'
})
export class Country {
  private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}country`;

  getcountry(

  ): Observable<IResponseOf<ICountry[]>> {
    const url = `${this.baseUrl}`;
    return this._http.get<IResponseOf<ICountry[]>>(url);
  }
}
