import { Component, signal } from '@angular/core';
import { Header } from './Layout/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './Layout/footer/footer';


@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular-Portfolio');
}
