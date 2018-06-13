import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/models/user';
import { ImageService } from 'app/services/image.service';
import { Skill } from 'app/models/skill';
import { SkillService } from 'app/services/skill.service';
import { faUsers } from '@fortawesome/fontawesome-pro-solid';
import { faTasks, faFileAlt } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faUsers);
fontawesome.library.add(faTasks);
fontawesome.library.add(faFileAlt);

declare var $: any;

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() task_id: number;
  @Input() skill: Skill;
  @Input() index = 0;
  @Input() editMode = false;
  @Output() removedSkill: EventEmitter<any> = new EventEmitter();

  private currentUser: User;
  private skillData: any;

  constructor(private _authService: AuthenticationService,
    private _imageService: ImageService,
    private _skillService: SkillService,
    private _router: Router) { }

  ngOnInit() {
    console.log(this.skill)
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private onBadgeClick() {
    this.getSkillData();
    $('#skillModal' + this.index).modal('show');
  }

  private getSkillData() {
    if (this.skill) {
      this._skillService.getSkillDetail(this.skill.name).subscribe(
        data => {
          this.skillData = data;
          // Load images for the users
          for (let i = 0; i < this.skillData.top_users.length; i++) {
            this._imageService.getUserImage(this.skillData.top_users[i].username).subscribe(
              image => this.skillData.top_users[i].image = image);
          }
        },
        error => console.log(error)
      );
    }
  }

  private addUserSkill() {
    this._skillService.postUserSkill(this.skill.name).subscribe(
      skill => {
        if (this.skillData) { this.skillData.user_has_skill = true; }
        this.getSkillData();
      },
      error => console.log(error)
    );
  }

  private removeSkill() {
    if (this.task_id) {
      this._skillService.deleteTaskSkill(this.task_id, this.skill.name).subscribe(
        success => this.removedSkill.emit());
    } else { this.removeUserSkill(); }
  }

  private removeUserSkill() {
    this._skillService.deleteUserSkill(this.skill.name).subscribe(
      success => {
        if (this.skillData) { this.skillData.user_has_skill = false; }
        this.removedSkill.emit();
      },
      error => console.log(error)
    );
  }

  private routeTo(url: string) {
    this._router.navigateByUrl(url);
  }
}
