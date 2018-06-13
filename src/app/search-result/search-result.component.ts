import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { AuthenticationService } from '../services/authentication.service';
import { Project } from 'app/models/project';
import { Task } from 'app/models/task';
import { User } from 'app/models/user';
import { faSearch } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faSearch);

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  private loading: boolean;
  private page_number: number;
  private query: string;
  private query_type: string;

  private user_results: User[];
  private task_results: Task[];
  private project_results: Project[];

  private page_range: number[];

  constructor(private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _router: Router,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this.loading = true;
    this.page_number = 1;
    this.query = '';
    this.page_range = [];

    this._activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['query']) { this.query = params['query'].toLowerCase(); }
      if (params['type']) {
        this.query_type = params['type'].toLowerCase();
      } else { this.query_type = 'all'; }
      if (params['page']) { this.page_number = params['page']; }

      this._authService.initComplete().subscribe(result => this.submitQuery());
    });
  }

  private isProject(value): boolean {
    return value instanceof Project;
  }

  private isTask(value): boolean {
    return value instanceof Task;
  }

  private isUser(value): boolean {
    return value instanceof User;
  }

  private submitQuery() {
    this.loading = true;
    this.project_results = [];
    this.task_results = [];
    this.user_results = [];

    let search_function;
    switch (this.query_type) {
      // Search only users
      case 'users': {
        search_function = this._sharedService.searchUsers(this.query, this.page_number);
        break;
      }
      // Search only projects
      case 'projects': {
        search_function = this._sharedService.searchProjects(this.query, this.page_number);
        break;
      }
      // Search only tasks
      case 'tasks': {
        search_function = this._sharedService.searchTasks(this.query, this.page_number);
        break;
      }
      // Search all
      default: { search_function = this._sharedService.search(this.query, this.page_number); }
    }

    search_function.subscribe(
      response => {
        const results = response.results;
        for (let i = 0; i < results.length; i++) {
          if (this.isProject(results[i])) { this.project_results.push(results[i]); }
          if (this.isTask(results[i])) { this.task_results.push(results[i]); }
          if (this.isUser(results[i])) { this.user_results.push(results[i]); }
        }

        this.page_number = response.page;
        this.getPageRange(response.count);
        this.loading = false;
      },
      error => this.loading = false
    );
  }

  private onKeyDown(event) {
    if (event.keyCode === 13) {
      const type_param: string = this.query_type ? '&type=' + this.query_type : '';
      this._router.navigateByUrl('/search?query=' + this.query + type_param);
    }
  }

  // Use results count to determine the number of pages to generate
  private getPageRange(count: number) {
    this.page_range = [];
    const max_page = (Math.ceil(count / 10));
    for (let i = 1; i <= max_page; i++) {
      this.page_range.push(i);
    }
  }
}
