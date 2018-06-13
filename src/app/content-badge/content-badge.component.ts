import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faTimes);

@Component({
  selector: 'app-content-badge',
  templateUrl: './content-badge.component.html',
  styleUrls: ['./content-badge.component.css']
})
export class ContentBadgeComponent implements OnInit {
  @Input() content: string;
  @Input() allowClick = false;
  @Input() showDelete = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter()
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
