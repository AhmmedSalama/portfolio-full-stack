import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IFooter } from '../../core/models/footer.model';
import { FooterService } from '../../core/services/footer.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {
  private footerService = inject(FooterService);

  footerData = signal<IFooter | null>(null);

  ngOnInit() {
    this.loadFooter();
  }

  loadFooter() {
    this.footerService.getFooter().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.footerData.set(res[0]);
        }
      },
      error: (err) => console.error("Could not load footer data", err)
    });
  }
}