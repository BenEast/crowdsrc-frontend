import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';

// App components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectListComponent } from './project/list/project.list.component';
import { ProjectDetailComponent } from './project/detail/project.detail.component';
import { UserDetailComponent } from './user/detail/user.detail.component';
import { CONST_ROUTING } from './app.routing';
import { ProjectFormComponent } from './forms/project-form/project.form.component';
import { AuthenticationService } from './services/authentication.service';
import { ConstantService } from './services/constant.service';
import { SharedService } from './services/shared.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { UpdateProfileFormComponent } from './forms/update-profile-form/update-profile-form.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectDetailTabComponent } from './project/detail/tabs/project-detail-tab/project-detail-tab.component';
import { ProjectTaskTabComponent } from './project/detail/tabs/project-task-tab/project-task-tab.component';
import { ProjectStatsTabComponent } from './project/detail/tabs/project-stats-tab/project-stats-tab.component';
import { DeleteTeamMessageModalComponent } from './project/detail/tabs/project-detail-tab/modals/delete-team-message-modal/delete-team-message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    UserDetailComponent,
    ProjectFormComponent,
    SidebarComponent,
    AboutComponent,
    ContactComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    UpdateProfileFormComponent,
    LoginComponent,
    SettingsComponent,
    PageNotFoundComponent,
    ProjectDetailTabComponent,
    ProjectTaskTabComponent,
    ProjectStatsTabComponent,
    DeleteTeamMessageModalComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    CONST_ROUTING,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, ConstantService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
