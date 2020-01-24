import { Component, OnInit } from '@angular/core';

import { rankingTask } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage {

  ranking: rankingTask[];
  subscription: Subscription = new Subscription();

  miranking;
  minombre;
  mispuntos;

  constructor(private rankingService: TodorankingService) { }

  ionViewWillEnter(){
    this.subscription = this.rankingService.getAllRanking().subscribe(res => {
      this.ranking = res;
      for(var i=0; i<this.ranking.length; i++){
        if(firebase.auth().currentUser.uid == this.ranking[i].erabiltzaileId){
          this.miranking = i+1;
          this.minombre = this.ranking[i].Izena;
          this.mispuntos = this.ranking[i].Puntuazioa
        }
      }
    });
  }
  formatNumber(i) {
    return Math.floor(i);
  }
  botonPlus() {
    window.location.reload();
  }

}
