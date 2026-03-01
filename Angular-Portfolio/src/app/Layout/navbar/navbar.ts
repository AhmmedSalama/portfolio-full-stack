import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = signal(false);
  indicatorWidth = signal(0);
  indicatorLeft = signal(0);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  updateIndicator(el: HTMLElement) {
    if (window.innerWidth >= 1024) {
      this.indicatorWidth.set(el.offsetWidth);
      this.indicatorLeft.set(el.offsetLeft);
    }
  }
}