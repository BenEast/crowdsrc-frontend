import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from "./user/detail/user.detail.component";
import { ProjectListComponent } from "./project/list/project.list.component";
import { ProjectDetailComponent } from "./project/detail/project.detail.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const MAINMENU_ROUTES: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profiles/:id', component: UserDetailComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', component: ProjectListComponent },
    { path: '**', component: PageNotFoundComponent },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);