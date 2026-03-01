import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../models/portfolio.model.ts/portfolio.model.ts';


@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/Projects';
  public readonly imgBaseUrl = 'http://localhost:3000/uploads/'; 

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl);
  }

  addProject(formData: FormData): Observable<IProject> {
    return this.http.post<IProject>(this.apiUrl, formData);
  }

  updateProject(id: string, formData: FormData): Observable<IProject> {
    return this.http.put<IProject>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProject(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}