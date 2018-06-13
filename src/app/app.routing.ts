import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user/detail/user.detail.component';
import { ProjectDetailComponent } from './project/detail/project.detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UserSettingsComponent } from 'app/user/user-settings/user-settings.component';
import { SearchResultComponent } from 'app/search-result/search-result.component';
import { ReviewComponent } from 'app/review/review.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { AccountDeletedComponent } from './account-deleted/account-deleted.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'account-deleted', component: AccountDeletedComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crowd/:username', component: UserDetailComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'src/create', component: CreateProjectComponent },
    { path: 'src/:id', component: ProjectDetailComponent },
    { path: 'settings', component: UserSettingsComponent },
    { path: 'search', component: SearchResultComponent },
    { path: 'verify', component: VerifyEmailComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'notifications', component: NotificationComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
export const CONST_ROUTING = RouterModule.forRoot(routes);
