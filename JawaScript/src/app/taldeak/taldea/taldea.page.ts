import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TaldeakService } from 'src/app/services/taldeak.service';
import { Subscription } from 'rxjs';
import { taldea } from 'src/app/models/task.interface';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-taldea',
  templateUrl: './taldea.page.html',
  styleUrls: ['./taldea.page.scss'],
})
export class TaldeaPage {

  private taldea: taldea[];
  taldeaitem: taldea = {
    izena: '',
    sortzailea: ''
  };
  taldeakitem: any;
  taldeak: any;
  misgrupos: taldea[] = [];
  subscription: Subscription = new Subscription();

  i; j; h = 0;
  taldeId = null;

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private taldeakService: TaldeakService) { }

  ionViewWillEnter() {
    this.taldeId = this.route.snapshot.params['id'];
    console.log(this.taldeId)
    if (this.taldeId) {
      this.loadAll();
    }
  }
  async loadAll() {
    this.subscription = this.taldeakService.getAlltaldeak().subscribe(res => {
      this.taldeakitem = res;
      for (this.i = 0; this.i < this.taldeakitem.length; this.i++) {
        this.subscription = this.taldeakService.getPartaideak(this.taldeId).subscribe(res => {
          this.taldeak = res;
          if(this.taldeak[this.h] != undefined){
            this.misgrupos.push(this.taldeak[this.h]);
          }
          this.h++;
        });
      }
    });
  }
}