import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFooter } from '../models/footer.model';


@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/footer';

  getFooter(): Observable<IFooter[]> {
    return this.http.get<IFooter[]>(this.apiUrl);
  }

  updateFooter(id: string, data: IFooter): Observable<IFooter> {
    return this.http.patch<IFooter>(`${this.apiUrl}/${id}`, data);
  }

  addFooter(data: IFooter): Observable<IFooter> {
    return this.http.post<IFooter>(this.apiUrl, data);
  }
}