import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.css']
})
export class ProjectCategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() index: number;
  @Input() projectId: number;
  @Input() edit_mode = false;
  @Output() deletedCategory: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _projectService: ProjectService) { }

  ngOnInit() { }

  private deleteCategory() {
    this._projectService.deleteProjectCategory(this.projectId, this.category.name).subscribe(
      success => this.deletedCategory.emit(this.index),
      error => console.log(error)
    );
  }
}
