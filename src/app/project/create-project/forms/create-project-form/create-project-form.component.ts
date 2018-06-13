import { Component, OnInit, Input } from '@angular/core';
import { Project, Category } from 'app/models/project';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faUndoAlt, faQuestionCircle } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faTimes);
fontawesome.library.add(faUndoAlt);
fontawesome.library.add(faQuestionCircle);

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css']
})
export class CreateProjectFormComponent implements OnInit {
  @Input() model: Project;

  private category = '';
  constructor() { }

  ngOnInit() {
  }

  private resetModel() {
    this.category = '';
    this.model.title = '';
    this.model.description = '';
  }

  private removeCategory(index: number) {
    this.model.categories.splice(index, 1);
  }

  private onKeyDown(event) {
    if (event.keyCode === 13) {
      if (this.category) { this.model.categories.push(new Category(this.category.trim())); }
      this.category = '';
    }
  }
}
