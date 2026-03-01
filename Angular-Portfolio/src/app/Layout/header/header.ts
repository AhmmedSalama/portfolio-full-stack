import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Navbar],
  template: `
    <header class="fixed top-0 w-full header z-50 backdrop-blur border-b border-white/5">
      <app-navbar></app-navbar>
    </header>
  `,
  styleUrl: './header.css'
})
export class Header {}