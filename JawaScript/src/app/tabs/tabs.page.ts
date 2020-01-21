import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  constructor(private router: Router) { }

  login = true;
  
  ionViewWillEnter() {
    const ruta = this.router.url;
    if (ruta == "/tabs/login") {
      this.login = false;
    }
    else if(ruta == "/tabs/tab1"){
      this.login = true;
    }
    else {
      this.login = true;
    }
  }


}
