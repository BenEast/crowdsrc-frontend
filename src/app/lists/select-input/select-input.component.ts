import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {
  /*
    -Assuming len optionValues <= len optionNames; but should be 1-1 pairing
    -Assuming model is the same type as optionValues
  */
  @Input() model: any;
  @Input() optionValues: any[];
  @Input() optionNames: string[];

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  ngOnInit() { }
}
