import { Component, OnInit } from '@angular/core';

import { rankingTask } from '../../models/task.interface';
import { TodorankingService } from '../../services/todoranking.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage {
  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: ''
  };
  rankId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private TodorankingService: TodorankingService, private loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    this.rankId = this.route.snapshot.params['id'];
    if (this.rankId) {
      this.loadAll();
    }
  }

  async loadAll() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.TodorankingService.getRanking(this.rankId).subscribe(res => {
      loading.dismiss();
      this.rankingitem = res;
    })
  }
  async saveAll() {
    const loading = await this.loadingController.create({
      message: 'Saving...'
    });
    await loading.present();

    if (this.rankId) {
      //update
      this.TodorankingService.updateRanking(this.rankingitem, this.rankId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      })
    }
    else {
      this.TodorankingService.addRanking(this.rankingitem, this.rankId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      })
    }
  }
}
