import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject, IProjects } from '../models/proudct.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/Projects'; 

  constructor(private _http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this.apiUrl);
  }

getLatestProjects(): Observable<IProject[]> {
  return this._http.get<IProject[]>(this.apiUrl); 
}

  getAllProjects(): Observable<IProjects[]> {
    return this._http.get<IProjects[]>(this.apiUrl);
  }
  createProject(projectData: IProject): Observable<IProject> {
    return this._http.post<IProject>(this.apiUrl, projectData);
  }
}