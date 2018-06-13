import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-suggestion-list-entry',
  templateUrl: './task-suggestion-list-entry.component.html',
  styleUrls: ['./task-suggestion-list-entry.component.css']
})
export class TaskSuggestionListEntryComponent implements OnInit {
  @Input() taskSuggestion: any;
  @Output() dismiss: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit() { }
}
