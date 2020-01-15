import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  username;
  isProba = true;

  constructor() {
    this.username = firebase.auth().currentUser.email;
    this.username = this.username.split('@')[0];
    if(this.username == "proba"){
      this.isProba = false;
    }
  }

}
