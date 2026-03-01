import { Component } from '@angular/core';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Stats } from '../stats/stats';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [About, Skills, Projects,Navbar, RouterOutlet,Stats],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}