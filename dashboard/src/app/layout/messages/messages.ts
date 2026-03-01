import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../services/messages.service';
import { IMessage } from '../../models/portfolio.model.ts/portfolio.model.ts';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  private msgService = inject(MessagesService);
  
  allMessages = signal<IMessage[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.msgService.getMessages().subscribe({
      next: (data) => {
        this.allMessages.set(data.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        ));
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  deleteMsg(id: string) {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة نهائياً؟')) {
      this.msgService.deleteMessage(id).subscribe({
        next: () => {
          this.allMessages.update(prev => prev.filter(m => m._id !== id));
        },
        error: (err) => console.error('خطأ أثناء الحذف:', err)
      });
    }
  }
}