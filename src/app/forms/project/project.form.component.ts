import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { SharedService } from '../../shared.service';
import { NgForm } from '@angular/forms';
import { Project } from '../../project/project';
import { Team } from '../../team/team';
import { Task } from '../../team/task';
import { User } from '../../user/user';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
	selector: 'project-form',
	templateUrl: './project.form.component.html',
	styleUrls: ['./project.form.component.css']
})
export class ProjectFormComponent implements OnInit {
	model = new Project(1, 'title', new User(1, "asdf", "sdfs", "asdfa", "sdfsds", "Sdfs", "dfsd"),
		'', [], 'description', 'datetime', new Team(), [], 'website')
	currentUser: number;
	successful: boolean = false;
	isAuthenticated: boolean;
	visibility: boolean;

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

	submitProject() {
		let project_json = JSON.stringify(this.model);
		this._sharedService.postProject(project_json).subscribe(
			success => {
				this.successful = true;
				this.submit.emit('success');
			},
			error => {
				console.log("Error posting project");
				console.log("Error: " + error);
			}
		);
	}
}