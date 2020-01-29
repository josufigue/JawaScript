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
  taldeakitem: any;
  taldeak: any;
  misgrupos: taldea[] = [];
  subscription: Subscription = new Subscription();
  subscription1: Subscription = new Subscription();

  i;j;h=0;

  constructor(private taldeaservice: TaldeakService) {

  }
  ionViewWillEnter() {
    this.subscription = this.taldeaservice.getAlltaldeak().subscribe(res => {
      this.taldeakitem = res;
      console.log(this.taldeakitem);
      console.log("User: "+ firebase.auth().currentUser.email);

      console.log(this.taldeakitem.length)
      for(this.i=0; this.i<this.taldeakitem.length; this.i++){
        this.taldeak=[]
        console.log('i='+this.i)
        this.subscription1 = this.taldeaservice.getTaldeak(this.taldeakitem[this.i].izena).subscribe(res2 => {
          this.taldeak = res2;
          console.log('i='+this.i)
          console.log(this.taldeak);
          console.log(this.taldeak.length)
          for(this.j=0; this.j<this.taldeak.length; this.j++){
          console.log('j='+this.j);
            console.log("ID: "+this.taldeak[this.j].Id)
            if(firebase.auth().currentUser.email == this.taldeak[this.j].Id){
              console.log(this.taldeak[this.j].Id)
              this.misgrupos.push(this.taldeakitem[this.h]);
              console.log(this.misgrupos);
            }
            else{
            }
          }
          this.h++;
        });
      }
    });
  }
}