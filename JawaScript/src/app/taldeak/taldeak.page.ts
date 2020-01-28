import { Component, OnInit } from '@angular/core';
import { taldea } from '../models/task.interface';
import { TaldeakService } from '../services/taldeak.service';
import { Subscription } from 'rxjs';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-taldeak',
  templateUrl: './taldeak.page.html',
  styleUrls: ['./taldeak.page.scss'],
})
export class TaldeakPage {
  private taldea: taldea[];
  taldeaitem: taldea = {
    izena: '',
    sortzailea: '',
    partaideak: []
  };
  algo: any;
  cosa: any;
  misgrupos: taldea[] = [];
  subscription: Subscription = new Subscription();
  subscription1: Subscription = new Subscription();

  i;j;

  constructor(private taldeaservice: TaldeakService) {

  }
  ionViewWillEnter() {
    this.subscription = this.taldeaservice.getAlltaldeak().subscribe(res => {
      this.algo = res;
      console.log(this.algo);
      console.log("User: "+ firebase.auth().currentUser.email);


      for(this.i=0; this.i<this.algo.length; this.i++){
        this.subscription1 = this.taldeaservice.getTaldeak(this.algo[this.i].izena).subscribe(res2 => {
          this.cosa = res2;
          console.log(this.cosa);
          for(this.j=0; this.j<this.cosa.length; this.j++){
            console.log("ID: "+this.cosa[this.j].Id)
            if(firebase.auth().currentUser.email == this.cosa[this.j].Id){
              
              this.misgrupos.push(this.algo[this.j]);
              console.log(this.misgrupos);
            }
          }
        });
      }
    });
  }
}
