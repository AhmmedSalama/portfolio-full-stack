import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../models/portfolio.model.ts/portfolio.model.ts';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/contact'; // تأكد من المسار في الباك اند

  getContactData(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  updateContact(id: string, data: IContact): Observable<IContact> {
    return this.http.patch<IContact>(`${this.apiUrl}/${id}`, data);
  }

  createContact(data: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.apiUrl, data);
  }
}