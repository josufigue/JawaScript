import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private router: Router) {}

  login = true;
  ngOnInit(){
    const ruta = this.router.url;
    if(ruta == "/tabs/login"){
      this.login = false;
    }
    else{
      this.login = true;
    }
  }


}
