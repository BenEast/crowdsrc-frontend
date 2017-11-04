import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-project-task-tab',
  templateUrl: './project-task-tab.component.html',
  styleUrls: ['./project-task-tab.component.css']
})
export class ProjectTaskTabComponent implements OnInit {
  @Input() tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

}
