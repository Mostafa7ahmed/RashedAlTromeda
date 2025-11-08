import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Shared/Interface/iresonse';
import { ICenter } from '../../Interface/iorganization';

@Injectable({
  providedIn: 'root'
})
export class Center {
       private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}center`;


  
      getOneCenter(id: number): Observable<IResponseOf<ICenter>> {
      return this._http.get<IResponseOf<ICenter>>(`${this.baseUrl}?id=${id}`);
    }
}
