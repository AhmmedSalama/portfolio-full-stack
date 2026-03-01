import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects.service'; 
import { IProject } from '../../core/models/proudct.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-short-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './short-projects.html',
  styleUrl: './short-projects.css',
})
export class ShortProjects implements OnInit {
  
  projects!: IProject[];
  selectedProject: IProject | null = null;
  showModal: boolean = false;

  readonly baseImgUrl = 'http://localhost:3000/uploads/';

  constructor(
    private _projectsService: ProjectsService, 
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this._projectsService.getLatestProjects().subscribe({
    next: (data) => {
      this.projects = data.map(item => ({
        ...item,
        image: `http://localhost:3000/uploads/${item.image}`
      })).slice(0, 3); 
      
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error('Error fetching projects:', err);
    }
  });
}

  openDetails(project: IProject): void {
    this.selectedProject = project;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}