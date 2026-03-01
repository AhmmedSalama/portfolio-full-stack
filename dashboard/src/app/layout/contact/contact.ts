import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm!: FormGroup;
  contactId = signal<string | null>(null);
  isLoading = signal(false);
  isSuccess = signal(false);

  ngOnInit() {
    this.initForm();
    this.loadContactData();
  }

  initForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      location: ['', Validators.required],
      linkedin: ['', Validators.required],
      github: ['', Validators.required],
      facebook: ['', Validators.required],
    });
  }

  loadContactData() {
    this.contactService.getContactData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          const data = res[0];
          this.contactId.set(data._id || null);
          this.contactForm.patchValue(data);
        }
      }
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isLoading.set(true);
    const id = this.contactId();
    const data = this.contactForm.value;

    const request = id 
      ? this.contactService.updateContact(id, data) 
      : this.contactService.createContact(data);

    request.subscribe({
      next: (res) => {
        if (!id) this.contactId.set(res._id || null);
        this.isLoading.set(false);
        this.isSuccess.set(true);
        setTimeout(() => this.isSuccess.set(false), 3000); 
      },
      error: () => this.isLoading.set(false)
    });
  }
}