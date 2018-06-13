import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'app/services/image.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProjectService } from 'app/services/project.service';
import { Project, Category } from 'app/models/project';
import { User } from 'app/models/user';
import { TeamMessage, TeamMessageReply } from 'app/models/team.message';

@Component({
  selector: 'app-project-detail-tab',
  templateUrl: './project-detail-tab.component.html',
  styleUrls: ['./project-detail-tab.component.css']
})
export class ProjectDetailTabComponent implements OnInit {
  @Input() project: Project;
  @Input() edit_mode = false;

  edit_description: string;

  private loadingData = true;
  private currentUser: User;

  constructor(private _authService: AuthenticationService,
    private _imageService: ImageService,
    private _projectService: ProjectService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);

    this.getProjectMessages();
    this.edit_description = this.project.description;
  }

  private onCategoryCreate(event: Category) {
    const categories = this.project.categories;
    categories.push(event);
    this.project.categories = sortCategoryList(categories);
  }

  private onCategoryDelete(event: number) {
    this.project.categories.splice(event, 1);
  }

  private onMessageDelete(event: number) {
    this.project.messages.splice(event, 1);
    this.project.message_count -= 1;
  }

  private onReplyDelete(event: number) {
    this.project.message_count -= 1;
  }

  private getProjectMessages() {
    this._projectService.getProjectMessages(this.project.id).subscribe(
      messages => {
        this.project.message_count = getMessageCount(messages);
        this.project.messages = messages;

        this.getMessageImages();
        this.loadingData = false;
      },
      error => {
        console.log(error);
        this.loadingData = false;
      }
    );
  }

  // Load user profile pictures, but only send one request per unique user
  private getMessageImages() {
    if (!this.project.messages) { return; }
    const requested_message_users: string[] = [];
    const requested_reply_users: string[] = [];

    for (const message of this.project.messages) {
      // If there's already an image, skip this one
      if (message.user.image) { continue; }

      const username = message.user.username;

      // If the user image has been requested, continue, else get the image
      if (requested_message_users.includes(username)) { continue }

      requested_message_users.push(username);

      this._imageService.getUserImage(username, 'md').subscribe(
        image => assignMessageImage(this.project.messages, image, username));

      for (const reply of message.replies) {
        if (reply.user.image) { continue; }

        const reply_username = reply.user.username;

        if (requested_reply_users.includes(reply_username)) { continue; }

        requested_reply_users.push(reply_username);

        this._imageService.getUserImage(reply_username, 'sm').subscribe(
          image => assignReplyImage(this.project.messages, image, reply_username));
      }
    }
  }

  private appendMessage(event: TeamMessage) {
    // event.user = currentUser to ensure the new message shows profile image
    event.user = this.currentUser;
    this.project.messages.unshift(event);
    this.project.message_count += 1;
  }
}

// Sort a list of categories alphabetically by name
function sortCategoryList(list: Category[]) {
  return list.sort((c1, c2): number => {
    if (c1.name < c2.name) { return -1; }
    if (c1.name > c2.name) { return 1; }
    return 0;
  });
}

function assignMessageImage(messages: TeamMessage[], image: string, username: string) {
  for (const message of messages) {
    if (message.user.username === username) { message.user.image = image; }
  }
}

function assignReplyImage(messages: TeamMessage[], image: string, username: string) {
  for (let i = 0; i < messages.length; i++) {
    for (const reply of messages[i].replies) {
      if (reply.user.username === username) { reply.user.image = image; }
    }
  }
}

function getMessageCount(messages: TeamMessage[]): number {
  let count = messages.length;
  for (const message of messages) {
    for (const reply of message.replies) {
      count += 1;
    }
  }
  return count;
}
