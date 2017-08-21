import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';

// App components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectListComponent } from './project/project.list.component';
import { ProjectDetailComponent } from './project/project.detail.component';
import { UserDetailComponent } from './user/user.detail.component';
import { CONST_ROUTING } from './app.routing';
import { SharedService } from './shared.service';
import { ProjectFormComponent } from './forms/project/project.form.component';
import { AuthenticationService } from './authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';

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
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    CONST_ROUTING,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
