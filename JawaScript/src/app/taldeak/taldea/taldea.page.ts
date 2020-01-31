import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MitaldeService } from 'src/app/services/mitalde.service';
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
  subscription1: Subscription = new Subscription();

  i; j; h = 0;
  taldeId = null;

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private taldeakService: MitaldeService) { }

  ngOnInit() {
    this.taldeId = this.route.snapshot.params['id'];
    console.log(this.taldeId)
    if (this.taldeId) {
      this.loadAll();
    }
  }
  async loadAll() {
    this.misgrupos = []
    this.subscription = this.taldeakService.getAlltaldeak().subscribe(res => {
      this.taldeakitem = res;
      for (this.i = 0; this.i < this.taldeakitem.length; this.i++) {
        this.subscription1 = this.taldeakService.getPartaideak(this.taldeId).subscribe(res => {
          this.taldeak = res;
          if(this.taldeak[this.h] != undefined){
            this.misgrupos.push(this.taldeak[this.h]);
          }
          this.h++;
        });
      }
      this.taldeId=""
      this.subscription.unsubscribe()
      this.subscription1.unsubscribe()
    });
  }
}