import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../services/about.service';
import { IAbout } from '../../models/portfolio.model.ts/portfolio.model.ts';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about.html'
})
export class About implements OnInit {
  private fb = inject(FormBuilder);
  public aboutService = inject(AboutService);

  aboutData = signal<IAbout | null>(null);
  imagePreview = signal<string | null>(null);
  selectedFile: File | null = null;
  aboutForm!: FormGroup;

  isLoading = signal(false);
  isSuccess = signal(false);

  ngOnInit() {
    this.initForm();
    this.loadAbout();
  }

  initForm() {
    this.aboutForm = this.fb.group({
      title: ['', Validators.required],
      job: ['', Validators.required],
      descJob: [''],
      desc: ['', Validators.required],
      skills: ['']
    });
  }

  loadAbout() {
    this.aboutService.getAbout().subscribe({
      next: (res: IAbout[]) => {
        if (res && res.length > 0) {
          const data = res[0];
          this.aboutData.set(data);
          this.aboutForm.patchValue({
            ...data,
            skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills
          });
          this.imagePreview.set(this.aboutService.getImgUrl(data.image));
        }
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  saveAbout() {
    if (this.aboutForm.invalid) return;
    this.isLoading.set(true);

    const formData = new FormData();
    const values = this.aboutForm.value;
    Object.keys(values).forEach(key => formData.append(key, values[key]));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const id = this.aboutData()?._id;
    const request = id 
      ? this.aboutService.updateAbout(id, formData) 
      : this.aboutService.addAbout(formData);

    request.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSuccess.set(true);
        this.loadAbout();
        setTimeout(() => this.isSuccess.set(false), 3000);
      },
      error: () => this.isLoading.set(false)
    });
  }
}