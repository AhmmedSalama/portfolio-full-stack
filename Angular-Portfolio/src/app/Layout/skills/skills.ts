import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from '../../core/services/skills.service';
import { ISkill } from '../../core/models/skills.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SKILLS implements OnInit {
  skillsList!: ISkill[];

  constructor(
    private _skillsService: SkillsService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
    this._skillsService.getSkills().subscribe({
      next: (data) => {
        this.skillsList = data.map(skill => ({
          ...skill,
          icon: `http://localhost:3000/uploads/${skill.icon}`
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching skills:', err)
    });
  }
}