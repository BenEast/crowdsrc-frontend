import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from "./user/user.detail.component";
import { ProjectListComponent } from "./project/project.list.component";
import { ProjectDetailComponent } from "./project/project.detail.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";

const MAINMENU_ROUTES: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profiles/:id', component: UserDetailComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: '', component: ProjectListComponent },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);