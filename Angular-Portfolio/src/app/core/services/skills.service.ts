import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private apiUrl = 'http://localhost:3000/skills';

  constructor(private _http: HttpClient) {}

  getSkills(): Observable<ISkill[]> {
    return this._http.get<ISkill[]>(this.apiUrl);
  }
}