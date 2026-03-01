import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IStat {
  label: string;
  value: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/stats';

  getStats(): Observable<IStat[]> {
    return this.http.get<IStat[]>(this.apiUrl);
  }
}