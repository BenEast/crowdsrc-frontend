import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-slider',
  templateUrl: './toggle-slider.component.html',
  styleUrls: ['./toggle-slider.component.css']
})
export class ToggleSliderComponent implements OnInit {
  @Input() value: boolean;
  @Input() disabled: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit() { }
}
