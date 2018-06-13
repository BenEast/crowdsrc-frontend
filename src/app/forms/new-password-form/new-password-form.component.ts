import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheckCircle);
fontawesome.library.add(faTimesCircle);

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css']
})
export class NewPasswordFormComponent implements OnInit {
  @Input() password: string;
  @Input() update = false;
  @Output() isValid: EventEmitter<string> = new EventEmitter<string>();

  private confirm: string;
  private error: string;
  private requirements: boolean;

  constructor() { }

  ngOnInit() {
    this.confirm = '';
    this.error = '';
    this.requirements = false;
  }

  private checkPassword() {
    if (!new RegExp(/^(?=.*[a-z])/).test(this.password)) {
      this.error = 'Must have a lowercase letter';
    }
    if (!new RegExp(/^(?=.*[A-Z])/).test(this.password)) {
      this.error = 'Must have a capital letter';
    }
    if (!new RegExp(/^(?=.*[0-9])/).test(this.password)) {
      this.error = 'Must have a number';
    }
    if (!new RegExp(/^(?=.*[-!@$%^&*()_+|~=`{}\[\]:;'<>?,.\/\\])/).test(this.password)) {
      this.error = 'Must have a symbol';
    }
    if (this.password.length < 8) {
      this.error = 'Must have at least 8 characters';
    }

    if (new RegExp( // Thar be dragons here
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@$%^&*()_+|~=`{}\[\]:;'<>?,.\/\\])[A-Za-z0-9-!@$%^&*()_+|~=`{}\[\]:;'<>?,.\/\\]{8,}/
    ).test(this.password)) {
      this.requirements = true;
      this.error = '';
    } else {
      this.requirements = false;
    }
  }

  private confirmPassword() {
    if (this.requirements && this.password === this.confirm) {
      this.isValid.emit(this.password);
    }
  }
}
