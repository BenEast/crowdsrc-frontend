import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'app/services/task.service';
import { TaskSubmission, Task } from 'app/models/task';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private submission: TaskSubmission;
  private task: Task;

  constructor(private _activatedRoute: ActivatedRoute,
    private _taskService: TaskService) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(
      params => this.getReview(params['task'], params['submission']));
  }

  private getReview(taskId: number, submissionId: number) {
    this._taskService.getReview(taskId, submissionId).subscribe(
      review => {
        this.task = review.task;
        this.submission = review.submission;
      },
      error => console.log(error)
    );
  }
}
