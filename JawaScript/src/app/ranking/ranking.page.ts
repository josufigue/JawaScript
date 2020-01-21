import { Component, OnInit } from '@angular/core';

import { rankingTask } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking: rankingTask[];
  subscription: Subscription = new Subscription();

  constructor(private rankingService: TodorankingService) { }

  ngOnInit() {
   /* try{
      this.subscription.unsubscribe();
    }
    catch(error){
      console.log(error);
    }*/
    this.subscription = this.rankingService.getAllRanking().subscribe(res => {
      this.ranking = res;

      console.log(this.ranking);
    });
    
  }

  botonPlus() {
    window.location.reload();
  }

}
