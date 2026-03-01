import { Component } from '@angular/core';
import { About } from '../about/about';
import { SKILLS } from '../skills/skills';
import { ShortProjects } from '../short-projects/short-projects';

@Component({
  selector: 'app-home',
  imports: [About,SKILLS,ShortProjects],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
