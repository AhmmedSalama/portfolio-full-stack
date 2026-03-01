import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects.service';
import { IProjects } from '../../core/models/proudct.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  allProjects: IProjects[] = [];
  selectedProject: IProjects | null = null;
  showModal = false;

  constructor(
    private _projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
    this._projectsService.getAllProjects().subscribe({
      next: (data) => {
        this.allProjects = data.map(project => ({
          ...project,
          image: `http://localhost:3000/uploads/${project.image}`
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching all projects:', err)
    });
  }

  openDetails(project: IProjects) {
    this.selectedProject = project;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}