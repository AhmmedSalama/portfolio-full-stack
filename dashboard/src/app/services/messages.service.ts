import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from '../models/portfolio.model.ts/portfolio.model.ts';


@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/messages';

  getMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.apiUrl);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}