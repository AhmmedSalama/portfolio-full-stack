import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/skills';
  private readonly imgBaseUrl = 'http://localhost:3000/uploads/';

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getIconUrl(iconName: string): string {
    return iconName ? `${this.imgBaseUrl}${iconName}` : '';
  }

  addSkill(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateSkill(id: string, formData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, formData);
  }

  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}