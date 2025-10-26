import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse, IResponseOf } from '../../Shared/Interface/iresonse';
import { ISuggestion , IAddsuggest } from '../Interface/isuggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {
  private _http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}suggestion/pagiante`;
refreshSuggestions = signal(false);

notifyRefresh() {
  this.refreshSuggestions.set(!this.refreshSuggestions());
}
  getSuggestion(
    pageIndex = 1,
    pageSize = 10,

  ): Observable<IPaginationResponse<ISuggestion>> {
    const url = `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get<IPaginationResponse<ISuggestion>>(url);
  }

  Addsuggest(suggestData: IAddsuggest): Observable<IResponseOf<ISuggestion>> {
    return this._http.post<IResponseOf<ISuggestion>>(
      `${environment.apiUrl}suggestion`,
      suggestData
    );
  } 
}
