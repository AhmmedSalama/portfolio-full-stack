import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { IAbout } from '../../core/models/about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  aboutData: IAbout | null = null;
  constructor(
    private aboutService: AboutService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.aboutService.getAboutData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.aboutData = res[0];
          this.cdr.detectChanges(); 
        }
      },
      error: (err) => console.error('Error loading about data:', err)
    });
  }
}