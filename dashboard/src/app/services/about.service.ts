import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAbout } from '../models/portfolio.model.ts/portfolio.model.ts';


@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/About';
  private readonly imgBaseUrl = 'http://localhost:3000/uploads/';

  getAbout(): Observable<IAbout[]> {
    return this.http.get<IAbout[]>(this.apiUrl);
  }

  getImgUrl(imgName: string | undefined): string {
    return imgName ? `${this.imgBaseUrl}${imgName}` : '';
  }

  addAbout(formData: FormData): Observable<IAbout> {
    return this.http.post<IAbout>(this.apiUrl, formData);
  }

  updateAbout(id: string, formData: FormData): Observable<IAbout> {
    return this.http.put<IAbout>(`${this.apiUrl}/${id}`, formData);
  }
}