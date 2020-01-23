import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterContentInit {
  user: User = new User();
  constructor(private router: Router, private authSvc: AuthService) { }

  ngAfterContentInit() {
    try{
      document.getElementsByTagName("ion-tab-bar")[0].hidden = true;
    }
    catch(error){
      console.log("error: "+error);
    }
  }

  async onLogin() {
    const user = await this.authSvc.onLogin(this.user);
    //var audio = new Audio('../../assets/music/mii-channel-music-plaza-hq.ogg');
    //audio.play();

    if (user) {
      console.log('Succesfully logged in!');
      this.router.navigateByUrl('/tabs/tab1');
    }
  }

}
