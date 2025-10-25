import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../Shared/Interface/iresonse';
import { IStreem } from '../../Shared/Interface/istreem';

@Injectable({
  providedIn: 'root'
})
export class Streem {
  private readonly API_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  uploadStreem(file: File): Observable<IResponseOf<IStreem>> {
    const formData = new FormData();
    formData.append('stream', file, file.name);
    return this.http.post<IResponseOf<IStreem>>(`${this.API_URL}stream`, formData);
  }
}
