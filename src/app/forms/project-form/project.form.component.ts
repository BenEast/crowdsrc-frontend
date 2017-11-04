import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { Team } from '../../models/team';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
	selector: 'project-form',
	templateUrl: './project.form.component.html',
	styleUrls: ['./project.form.component.css']
})
export class ProjectFormComponent implements OnInit {
	private model = new Project(1, 'title', new User(1, "", "", "", "", "", "", "", [], "", "", "", ""),
		'', 'description', 'datetime', new Team(), [], 'website')
	private currentUser: number;
	private isAuthenticated: boolean;
	private visibility: boolean;

	@Output() submit = new EventEmitter();

	constructor(private _authService: AuthenticationService, private _sharedService: SharedService) { }
	ngOnInit() {
		this.visibility = false;
		this.isAuthenticated = this._authService.userIsAuthenticated();

		if (this.isAuthenticated) {
			this._authService.getCurrentUserId().subscribe(
				response => {
					this.currentUser = response.json().user_id;
				},
				(error: any) => {
					console.log("Error validating user token");
					console.log(error);
				}
			);
		}
	}

	private submitProject() {
		let project_json = JSON.stringify(this.model);
		this._sharedService.postProject(project_json).subscribe(
			success => {
				this.submit.emit('success');
			},
			error => {
				console.log("Error posting project");
				console.log("Error: " + error);
			}
		);
	}
}