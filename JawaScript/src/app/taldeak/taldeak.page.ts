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
  constructor(private taldeaservice: TaldeakService) {

  }
  ionViewWillEnter() {
    this.subscription = this.taldeaservice.getAlltaldeak().subscribe(res => {
      this.algo = res;
      for(var i=0; i<this.algo.length; i++){
        for(var j=0; j<this.algo[i].length.partaideak.length; j++){
        // for(var j=0; j<this.algo[i].partaideak.length; j++)
        console.log('hola '+JSON.stringify(this.algo[i].partaideak[j]))
        // this.subscription1 = this.taldeaservice.gettaldeak(JSON.stringify(this.algo[i].partaideak)).subscribe(res => {
        //   this.cosa = res;
          if(JSON.stringify(this.algo[i].partaideak.some(e => e.Id === firebase.auth().currentUser.email))){
            // this.misgrupos.push(this.cosa)
            console.log('nooooooooooooooooooooooooooooooooo')
          }
          console.log(this.algo)
        }
      }
      
      // for (var i=0; i < this.taldea.length; i++) {
      //   for (var j=0; j < this.taldea[i].partaideak.length; j++) {
      //     if(firebase.auth().currentUser.email == this.taldea[i].partaideak[j]){
      //      this.misgrupos.push(this.taldea[i])
      //      console.log(this.misgrupos)
      //     }
      //   }
      // }
    });
  }
}
