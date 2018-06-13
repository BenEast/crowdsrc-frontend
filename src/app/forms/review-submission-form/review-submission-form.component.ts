import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { TaskService } from 'app/services/task.service';
import { Task, TaskSubmission } from 'app/models/task';
import { User } from 'app/models/user';
import { Skill } from 'app/models/skill';

@Component({
  selector: 'app-review-submission-form',
  templateUrl: './review-submission-form.component.html',
  styleUrls: ['./review-submission-form.component.css']
})
export class ReviewSubmissionFormComponent implements OnInit {
  @Input() submissionId: number;
  @Input() taskSkills: Skill[];

  private currentUser: User;
  private rating: number;
  private skillRatings: number[] = [];

  constructor(private _authService: AuthenticationService,
    private _taskService: TaskService) { }

  ngOnInit() {
    this.resetRatings();
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private resetRatings() {
    this.rating = 5;
    for (let i = 0; i < this.taskSkills.length; i++) { this.skillRatings.push(5); }
  }

  private submitReview() {
    // Map skill names to their ratings
    const that = this;
    const skills = this.taskSkills.map(function (e, i) {
      return [e.name, that.skillRatings[i]];
    });
    const review_json = JSON.stringify({
      'reviewer': this.currentUser.id,
      'submission': this.submissionId,
      'rating': this.rating,
      'skill_reviews': skills,
    });
    this._taskService.postReview(review_json).subscribe(
      success => this.resetRatings(),
      error => console.log(error)
    );
  }
}
