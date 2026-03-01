import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAbout } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/About';

  constructor(private http: HttpClient) {}

  getAboutData(): Observable<IAbout[]> {
    return this.http.get<IAbout[]>(this.apiUrl);
  }

  updateAboutData(id: string, data: Partial<IAbout>): Observable<IAbout> {
    return this.http.put<IAbout>(`${this.apiUrl}/${id}`, data);
  }
}