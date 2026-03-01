import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { IContact, IMessage } from '../../core/models/Contact.model'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class ContactComponent implements OnInit {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);
  
  contactData = signal<IContact | null>(null);
  msgForm!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.loadContactData();
  }

  initForm() {
    this.msgForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  loadContactData() {
    this.contactService.getContactData().subscribe({
      next: (res: IContact[]) => {
        if (res && res.length > 0) this.contactData.set(res[0]);
      },
      error: (err) => console.error('Failed to load contact info', err)
    });
  }

  onSend() {
    if (this.msgForm.invalid) return;

    const messagePayload: IMessage = this.msgForm.value;

    this.contactService.sendMessage(messagePayload).subscribe({
      next: () => {
        Swal.fire({
          title: 'MESSAGE SENT',
          html: 'Your message has been safely delivered to the terminal.',
          icon: 'success',
          iconColor: '#27c93f',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          padding: '2.5rem',
          customClass: {
            popup: 'portfolio-alert-popup',
            timerProgressBar: 'portfolio-alert-progress'
          }
        });
        this.msgForm.reset();
      },
      error: (err) => {
        Swal.fire('Error', 'Something went wrong, please try again.', 'error');
        console.error('Send message error:', err);
      }
    });
  }
}