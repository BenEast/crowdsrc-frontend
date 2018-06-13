import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'app/models/project';

@Component({
  selector: 'app-project-list-entry',
  templateUrl: './project-list-entry.component.html',
  styleUrls: ['./project-list-entry.component.css']
})
export class ProjectListEntryComponent implements OnInit {
  @Input() project: Project;

  constructor() { }
  ngOnInit() { }
}
