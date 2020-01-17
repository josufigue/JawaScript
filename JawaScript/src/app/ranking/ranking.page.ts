import { Component, OnInit } from '@angular/core';

import { rankingTask } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service'
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking: rankingTask[];
  constructor(private rankingService: TodorankingService) { }

  ngOnInit() {
    this.rankingService.getAllRanking().subscribe( res =>{
      this.ranking = res;
    });
    console.log('aaa',this.ranking);
  }

}
