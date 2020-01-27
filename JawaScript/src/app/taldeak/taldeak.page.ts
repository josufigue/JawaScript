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
  misgrupos: taldea[] = [];
  subscription: Subscription = new Subscription();
  constructor(private taldeaservice: TaldeakService) {

  }
  ionViewWillEnter() {
    this.subscription = this.taldeaservice.getAlltaldeak().subscribe(res => {
      this.taldea = res;
      for (var i=0; i < this.taldea.length; i++) {
        this.taldeaitem = this.taldea[i];
        for (var j=0; j < this.taldeaitem.partaideak.length; j++) {
          if(firebase.auth().currentUser.email == this.taldeaitem.partaideak[j]){
           this.misgrupos.push(this.taldeaitem)
           console.log(this.misgrupos)
          }
        }
      }
    });
  }
}
