import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'app/services/image.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-user-square-list-entry',
  templateUrl: './user-square-list-entry.component.html',
  styleUrls: ['./user-square-list-entry.component.css']
})
export class UserSquareListEntryComponent implements OnInit {
  @Input() user: User;

  constructor(private _imageService: ImageService) { }

  ngOnInit() {
    this.getUserImage();
  }

  private getUserImage() {
    this._imageService.getUserImage(this.user.username, 'sm').subscribe(
      image => this.user.image = image);
  }
}
