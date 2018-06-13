import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user';

@Component({
  selector: 'app-user-tasks-tab',
  templateUrl: './user-tasks-tab.component.html',
  styleUrls: ['./user-tasks-tab.component.css']
})
export class UserTasksTabComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() { }

  private onUnsave(index: number) {
    this.user.saved_tasks.splice(index, 1);
  }
}
