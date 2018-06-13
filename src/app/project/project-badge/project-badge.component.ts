import { Component, OnInit, Input } from '@angular/core';
import { faEnvelope, faTasks } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faEnvelope);
fontawesome.library.add(faTasks);

@Component({
  selector: 'app-project-badge',
  templateUrl: './project-badge.component.html',
  styleUrls: ['./project-badge.component.css']
})
export class ProjectBadgeComponent implements OnInit {
  @Input() message_count: number;
  @Input() task_count: number;

  constructor() { }

  ngOnInit() { }
}
