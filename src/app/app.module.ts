import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { RecaptchaModule } from 'ng2-recaptcha';

import { AppComponent } from 'app/app.component';
import { MenuComponent } from 'app/menu/menu.component';
import { ProjectDetailComponent } from 'app/project/detail/project.detail.component';
import { UserDetailComponent } from 'app/user/detail/user.detail.component';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { AboutComponent } from 'app/about/about.component';
import { ContactComponent } from 'app/contact/contact.component';
import { LoginFormComponent } from 'app/forms/login-form/login-form.component';
import { RegistrationFormComponent } from 'app/forms/registration-form/registration-form.component';
import { LoginComponent } from 'app/login/login.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { ProjectDetailTabComponent } from 'app/project/detail/tabs/project-detail-tab/project-detail-tab.component';
import { ProjectTaskTabComponent } from 'app/project/detail/tabs/project-task-tab/project-task-tab.component';
import { ProjectStatsTabComponent } from 'app/project/detail/tabs/project-stats-tab/project-stats-tab.component';
import { ProjectDetailTabMessageFormComponent } from 'app/project/detail/tabs/project-detail-tab/forms/project-detail-tab-message-form/project-detail-tab-message-form.component';
import { UserDetailTabComponent } from 'app/user/detail/tabs/user-detail-tab/user-detail-tab.component';
import { CapitalizePipe } from 'app/pipes/capitalize.pipe';
import { SubmitTaskFormComponent } from 'app/forms/submit-task-form/submit-task-form.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UploadProfileImageComponent } from 'app/forms/upload-profile-image/upload-profile-image.component';
import { SkillComponent } from 'app/skill/skill.component';
import { AddSkillFormComponent } from 'app/forms/add-skill-form/add-skill-form.component';
import { UserSettingsComponent } from 'app/user/user-settings/user-settings.component';
import { UserStatsTabComponent } from 'app/user/detail/tabs/user-stats-tab/user-stats-tab.component';
import { TeamMessageComponentComponent } from 'app/lists/team-message/team-message.component';
import { TeamMessageReplyComponentComponent } from 'app/lists/team-message-reply/team-message-reply.component';
import { ProjectCategoryComponent } from 'app/lists/project-category/project-category.component';
import { MessageReplyFormComponent } from 'app/project/detail/tabs/project-detail-tab/forms/message-reply-form/message-reply-form.component';
import { AddCategoryFormComponent } from 'app/project/detail/tabs/project-detail-tab/forms/add-category-form/add-category-form.component';
import { SearchResultComponent } from 'app/search-result/search-result.component';
import { ProjectListEntryComponent } from 'app/lists/project-list-entry/project-list-entry.component';
import { TaskListEntryComponent } from 'app/lists/task-list-entry/task-list-entry.component';
import { UserListEntryComponent } from 'app/lists/user-list-entry/user-list-entry.component';
import { ProjectBadgeComponent } from 'app/project/project-badge/project-badge.component';
import { TaskSubmissionFormComponent } from 'app/forms/task-submission-form/task-submission-form.component';
import { CONST_ROUTING } from 'app/app.routing';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { ImageService } from 'app/services/image.service';
import { MapService } from 'app/services/map.service';
import { SharedService } from 'app/services/shared.service';
import { ProjectService } from 'app/services/project.service';
import { UserService } from 'app/services/user.service';
import { TaskService } from 'app/services/task.service';
import { SkillService } from 'app/services/skill.service';
import { UserSubmissionViewComponent } from './user-submission-view/user-submission-view.component';
import { FileSizePipe } from 'app/pipes/file.size.pipe';
import { ReviewSubmissionFormComponent } from './forms/review-submission-form/review-submission-form.component';
import { ReviewComponent } from './review/review.component';
import { SubmissionListEntryComponent } from './lists/submission-list-entry/submission-list-entry.component';
import { SubmissionsViewComponent } from 'app/lists/task-list-entry/submissions-view/submissions-view.component';
import { TaskSuggestionListEntryComponent } from './lists/task-suggestion-list-entry/task-suggestion-list-entry.component';
import { SaveTaskFormComponent } from './forms/save-task-form/save-task-form.component';
import { UserTasksTabComponent } from 'app/user/detail/tabs/user-tasks-tab/user-tasks-tab.component';
import { LoadingComponent } from './loading/loading.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { CreateProjectFormComponent } from './project/create-project/forms/create-project-form/create-project-form.component';
import { CreateProjectTaskFormComponent } from './project/create-project/forms/create-project-task-form/create-project-task-form.component';
import { ContentBadgeComponent } from './content-badge/content-badge.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { NewPasswordFormComponent } from './forms/new-password-form/new-password-form.component';
import { UserPrivacySettingsTabComponent } from 'app/user/user-settings/tabs/user-privacy-settings-tab/user-privacy-settings-tab.component';
import { UserPreferencesTabComponent } from 'app/user/user-settings/tabs/user-preferences-tab/user-preferences-tab.component';
import { UserAccountSettingsTabComponent } from 'app/user/user-settings/tabs/user-account-settings-tab/user-account-settings-tab.component';
import { ToggleSliderComponent } from './lists/toggle-slider/toggle-slider.component';
import { SelectInputComponent } from './lists/select-input/select-input.component';
import { BlockUsersFormComponent } from 'app/user/user-settings/tabs/user-privacy-settings-tab/forms/block-users-form/block-users-form.component';
import { CrowdRequestFormComponent } from './forms/crowd-request-form/crowd-request-form.component';
import { UserCrowdTabComponent } from './user/detail/tabs/user-crowd-tab/user-crowd-tab.component';
import { UserSquareListEntryComponent } from './lists/user-square-list-entry/user-square-list-entry.component';
import { CrowdService } from 'app/services/crowd.service';
import { AccountDeletedComponent } from './account-deleted/account-deleted.component';
import { ChangePasswordFormComponent } from 'app/user/user-settings/tabs/user-account-settings-tab/forms/change-password-form/change-password-form.component';
import { ChangeEmailFormComponent } from 'app/user/user-settings/tabs/user-account-settings-tab/forms/change-email-form/change-email-form.component';
import { DeleteAccountFormComponent } from 'app/user/user-settings/tabs/user-account-settings-tab/forms/delete-account-form/delete-account-form.component';
import { RouteService } from 'app/services/route.service';
import { UserPreferencesFormComponent } from './user/user-settings/tabs/user-preferences-tab/forms/user-preferences-form/user-preferences-form.component';
import { UserNotificationsFormComponent } from './user/user-settings/tabs/user-preferences-tab/forms/user-notifications-form/user-notifications-form.component';
import { UserSearchSettingsFormComponent } from './user/user-settings/tabs/user-privacy-settings-tab/forms/user-search-settings-form/user-search-settings-form.component';
import { UserViewingSettingsFormComponent } from './user/user-settings/tabs/user-privacy-settings-tab/forms/user-viewing-settings-form/user-viewing-settings-form.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './services/notification.service';

// App components
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjectDetailComponent,
    UserDetailComponent,
    SidebarComponent,
    AboutComponent,
    ContactComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProjectDetailTabComponent,
    ProjectTaskTabComponent,
    ProjectStatsTabComponent,
    ProjectDetailTabMessageFormComponent,
    UserDetailTabComponent,
    CapitalizePipe,
    FileSizePipe,
    SubmitTaskFormComponent,
    UserPrivacySettingsTabComponent,
    BlockUsersFormComponent,
    DashboardComponent,
    UploadProfileImageComponent,
    SkillComponent,
    AddSkillFormComponent,
    UserSettingsComponent,
    UserStatsTabComponent,
    TeamMessageComponentComponent,
    TeamMessageReplyComponentComponent,
    MessageReplyFormComponent,
    ProjectCategoryComponent,
    AddCategoryFormComponent,
    SearchResultComponent,
    ProjectListEntryComponent,
    TaskListEntryComponent,
    UserListEntryComponent,
    ProjectBadgeComponent,
    TaskSubmissionFormComponent,
    SubmissionsViewComponent,
    UserSubmissionViewComponent,
    ReviewSubmissionFormComponent,
    ReviewComponent,
    SubmissionListEntryComponent,
    TaskSuggestionListEntryComponent,
    SaveTaskFormComponent,
    UserTasksTabComponent,
    LoadingComponent,
    CreateProjectComponent,
    CreateProjectFormComponent,
    CreateProjectTaskFormComponent,
    ContentBadgeComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NewPasswordFormComponent,
    UserAccountSettingsTabComponent,
    UserPreferencesTabComponent,
    ToggleSliderComponent,
    SelectInputComponent,
    CrowdRequestFormComponent,
    UserCrowdTabComponent,
    UserSquareListEntryComponent,
    AccountDeletedComponent,
    ChangePasswordFormComponent,
    ChangeEmailFormComponent,
    DeleteAccountFormComponent,
    UserPreferencesFormComponent,
    UserNotificationsFormComponent,
    UserSearchSettingsFormComponent,
    UserViewingSettingsFormComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CONST_ROUTING,
    AngularCropperjsModule,
    RecaptchaModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    ConstantService,
    CrowdService,
    ImageService,
    MapService,
    NotificationService,
    SharedService,
    ProjectService,
    UserService,
    TaskService,
    SkillService,
    RouteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
