import { Component, OnInit } from '@angular/core';

import { TaskI } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service'
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  todosRanking: TaskI[];
  constructor(private rankingService: TodorankingService) { }

  ngOnInit() {
    this.rankingService.getAllRanking().subscribe(res =>
      this.todosRanking = res
    );
  }

}
