import { Component, OnInit } from '@angular/core';

import { rankingTask } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage {

  ranking: rankingTask[];
  subscription: Subscription = new Subscription();

  constructor(private rankingService: TodorankingService) { }

  ionViewWillEnter(){
    this.subscription = this.rankingService.getAllRanking().subscribe(res => {
      this.ranking = res;
    });
  }

  botonPlus() {
    window.location.reload();
  }

}
