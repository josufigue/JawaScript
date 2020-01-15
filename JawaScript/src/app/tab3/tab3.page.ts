import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  username;

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.username = firebase.auth().currentUser.email;
    this.username = this.username.split('@')[0];
  }

  
  
  

  onLogout(){
    console.log('Logout!');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
