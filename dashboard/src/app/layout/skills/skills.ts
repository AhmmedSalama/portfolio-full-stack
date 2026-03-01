import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../services/skill.service';
import { ISkill } from '../../models/portfolio.model.ts/portfolio.model.ts';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills.html'
})
export class Skills implements OnInit {
  private fb = inject(FormBuilder);
  public skillService = inject(SkillService);

  skills = signal<ISkill[]>([]);
  isModalOpen = signal(false);
  selectedSkill = signal<ISkill | null>(null);
  imagePreview = signal<string | null>(null);
  selectedFile: File | null = null;
  skillForm!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.loadSkills();
  }

  initForm() {
    this.skillForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(data => this.skills.set(data));
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

  openModal(skill: ISkill | null = null) {
    this.selectedSkill.set(skill);
    if (skill) {
      this.skillForm.patchValue({ name: skill.name });
      this.imagePreview.set(this.skillService.getIconUrl(skill.icon));
    } else {
      this.skillForm.reset();
      this.imagePreview.set(null);
      this.selectedFile = null;
    }
    this.isModalOpen.set(true);
  }

  saveSkill() {
    if (this.skillForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.skillForm.get('name')?.value);
    if (this.selectedFile) {
      formData.append('icon', this.selectedFile);
    }

    const currentSkill = this.selectedSkill();
    const request = currentSkill?._id
      ? this.skillService.updateSkill(currentSkill._id, formData)
      : this.skillService.addSkill(formData);

    request.subscribe({
      next: () => {
        this.loadSkills();
        this.closeModal();
      },
      error: (err) => console.error('Error saving skill:', err)
    });
  }

  deleteSkill(id: string | undefined) {
    if (!id) return;
    if (confirm('هل أنت متأكد من حذف هذه المهارة؟')) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => {
          this.skills.update(prev => prev.filter(s => s._id !== id));
        },
        error: (err) => console.error('Error deleting skill:', err)
      });
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedFile = null;
    this.imagePreview.set(null);
    this.skillForm.reset();
    this.selectedSkill.set(null);
  }
}