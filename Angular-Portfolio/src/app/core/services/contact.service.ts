import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact, IMessage } from '../models/Contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly contactUrl = 'http://localhost:3000/contact';
  private readonly messagesUrl = 'http://localhost:3000/messages';

  getContactData(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.contactUrl);
  }

  sendMessage(msgData: IMessage): Observable<any> {
    return this.http.post(this.messagesUrl, msgData);
  }
}