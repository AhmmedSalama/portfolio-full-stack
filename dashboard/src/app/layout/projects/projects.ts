import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { IProject } from '../../models/portfolio.model.ts/portfolio.model.ts';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projects.html'
})
export class Projects implements OnInit {
  private fb = inject(FormBuilder);
  public projectService = inject(ProjectService);

  projects = signal<IProject[]>([]);
  isModalOpen = signal(false);
  modalMode = signal<'view' | 'edit'>('view');
  selectedProject = signal<IProject | null>(null);
  
  imagePreview = signal<string | null>(null);
  selectedFile: File | null = null;
  editForm!: FormGroup;

  ngOnInit() {
    this.loadProjects();
    this.initForm();
  }

  initForm() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      shortDescription: [''],
      description: ['', Validators.required],
      techs: [''], 
      githubLink: [''],
      liveDemo: ['']
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error("Error loading projects:", err)
    });
  }

  openModal(project: IProject | null = null, mode: 'view' | 'edit' = 'edit') {
    this.modalMode.set(mode);
    this.selectedProject.set(project);
    this.isModalOpen.set(true);

    if (project && mode === 'edit') {
      this.editForm.patchValue({
        ...project,
        techs: Array.isArray(project.techs) ? project.techs.join(', ') : project.techs
      });
      this.imagePreview.set(this.projectService.imgBaseUrl + project.image);
    } else {
      this.editForm.reset();
      this.imagePreview.set(null);
    }
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

  onDeleteProject(id: string, event: Event) {
    event.stopPropagation();
    if (window.confirm('Confirm permanent deletion of this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects.update(list => list.filter(p => p._id !== id));
        },
        error: (err) => console.error("Delete error:", err)
      });
    }
  }

  saveProject() {
    if (this.editForm.valid) {
      const formData = new FormData();
      Object.keys(this.editForm.value).forEach(key => {
        formData.append(key, this.editForm.value[key]);
      });

      if (this.selectedFile) formData.append('image', this.selectedFile);

      const projectId = this.selectedProject()?._id;
      const request = projectId 
        ? this.projectService.updateProject(projectId, formData) 
        : this.projectService.addProject(formData);

      request.subscribe({
        next: () => {
          this.loadProjects();
          this.closeModal();
        },
        error: (err) => console.error("Error saving:", err)
      });
    }
  }

  closeModal() { 
    this.isModalOpen.set(false); 
    this.selectedProject.set(null);
    this.selectedFile = null;
    this.imagePreview.set(null);
    this.editForm.reset();
  }
}