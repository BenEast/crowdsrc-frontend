import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';
import { faPlus } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPlus);

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.css']
})
export class AddCategoryFormComponent implements OnInit {
  @Input() projectId: number;
  @Output() addedCategory: EventEmitter<Category> = new EventEmitter<Category>();

  private category_name = '';

  constructor(private _projectService: ProjectService) { }

  ngOnInit() { }

  private onKeyDown(event) {
    if (event.keyCode === 13) { this.submitCategory(); }
  }

  private submitCategory() {
    this._projectService.postProjectCategory(this.projectId, this.category_name).subscribe(
      category => this.addedCategory.emit(category),
      error => console.log(error)
    );
    this.category_name = '';
  }
}
