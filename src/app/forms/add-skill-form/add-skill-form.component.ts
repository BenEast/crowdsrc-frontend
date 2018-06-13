import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from 'app/models/skill';
import { SkillService } from 'app/services/skill.service';
import { faPlus } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPlus);

@Component({
  selector: 'app-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.css']
})
export class AddSkillFormComponent implements OnInit {
  @Input() task_id: number;
  @Input() user_id: number;
  @Output() addedSkill: EventEmitter<Skill> = new EventEmitter<Skill>();

  private skill_name: string;

  constructor(private _skillService: SkillService) { }

  ngOnInit() {
    this.skill_name = '';
  }

  private submitSkill() {
    if (/\S/.test(this.skill_name)) {
      if (this.user_id) {
        this._skillService.postUserSkill(this.skill_name).subscribe(
          skill => this.addedSkill.emit(skill),
          error => console.log(error)
        );
      } else if (this.task_id) {
        this._skillService.postTaskSkill(this.task_id, this.skill_name).subscribe(
          skill => this.addedSkill.emit(skill),
          error => console.log(error)
        );
      }
    }
    this.skill_name = '';
  }

  private keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submitSkill();
    }
  }
}
