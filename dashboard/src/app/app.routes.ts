import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Projects } from './layout/projects/projects';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Stats } from './layout/stats/stats';
import { Contact } from './layout/contact/contact';
import { Messages } from './layout/messages/messages';

export const routes: Routes = [
    { path: "", component: Stats },
    { path: "projects", component: Projects },
    { path: "about", component: About },
    { path: "skills", component: Skills },
    { path: "navbar", component: Navbar },
    { path: "footer", component: Footer },
    { path: "contact", component: Contact },
    { path: "messages", component: Messages },
];