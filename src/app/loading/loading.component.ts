import { Component, OnInit } from '@angular/core';
import { faSpinnerThird as thirdLight, faCircleNotch as notchLight } from '@fortawesome/fontawesome-pro-light';
import { faSpinnerThird } from '@fortawesome/fontawesome-pro-regular';
import { faCircleNotch } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(thirdLight);
fontawesome.library.add(notchLight);
fontawesome.library.add(faSpinnerThird);
fontawesome.library.add(faCircleNotch);

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
