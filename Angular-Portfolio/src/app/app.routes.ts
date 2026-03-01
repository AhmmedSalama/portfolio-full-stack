import { Routes } from '@angular/router';
import { Home } from './Layout/home/home';

import { Projects } from './Layout/projects/projects';
import { ContactComponent } from './Layout/contact/contact';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"Projects",component:Projects},
    {path:"Contact",component:ContactComponent},
    
];
