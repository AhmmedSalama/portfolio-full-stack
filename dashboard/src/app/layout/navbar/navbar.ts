import { Component, signal, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private navService = inject(NavbarService);
  private cdr = inject(ChangeDetectorRef);

  isMenuOpen = signal(false);
  indicatorWidth = signal(0);
  indicatorLeft = signal(0);
  
  navItems = signal<{label: string, url: string}[]>([]);
  logoText = signal('PORTFOLIO');
  portfolioUrl = signal('#');

  ngOnInit() {
    this.navService.getNavbarData().subscribe({
      next: (data) => {
        if (data) {
          this.navItems.set(data.navLinks); 
          this.logoText.set(data.logoText);
          this.portfolioUrl.set(data.cvUrl);
        }
      },
      error: (err) => console.error('Navbar API Error:', err)
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  updateIndicator(el: HTMLElement) {
    setTimeout(() => {
      if (window.innerWidth >= 1024) {
        this.indicatorWidth.set(el.offsetWidth);
        this.indicatorLeft.set(el.offsetLeft);
        this.cdr.detectChanges();
      }
    }, 50); 
  }
}