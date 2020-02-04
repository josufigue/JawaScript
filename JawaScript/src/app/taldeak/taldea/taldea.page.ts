import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { MitaldeService } from 'src/app/services/mitalde.service';
import { Subscription } from 'rxjs';
import { taldea, rankingTask, partaideak } from 'src/app/models/task.interface';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { TaldeakService } from 'src/app/services/taldeak.service';
import { TodorankingService } from '../../services/todoranking.service';
import { createNgModule } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-taldea',
  templateUrl: './taldea.page.html',
  styleUrls: ['./taldea.page.scss'],
})
export class TaldeaPage {
  ranking: rankingTask[];
  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: '',
    jokatuta: '',
    azkenengoPartida: [],
    azkenengoDenbora: 0,
    azkenengoPuntuazioa: 0
  };
  partaidea: partaideak = {
    Id: '',
    izena: ''
  }
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

  constructor(private router: Router, private rankingService: TodorankingService, private alertController: AlertController, private taldeaservice: TaldeakService, private route: ActivatedRoute, private loadingController: LoadingController, private taldeakService: MitaldeService) { }

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
          for (this.j = 0; this.j < this.taldeak.length; this.j++) {
            if (this.taldeak[this.h] != undefined) {
              this.misgrupos.push(this.taldeak[this.h]);
            }
            this.h++;
          }
        });
      }
      this.taldeId = ""
      this.subscription.unsubscribe()
      this.subscription1.unsubscribe()
    });
  }
  async creategroup() {
    const alert = await this.alertController.create({
      header: 'Taldea sortu',
      inputs: [
        {
          name: 'name1',
          value: '',
          type: 'text',
          placeholder: 'Taldearen izena'
        },
      ],
      buttons: [
        {
          text: 'Ezeztatu',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Gorde',
          handler: async data => {
            const loading = await this.loadingController.create({
              message: 'Gordetzen...'
            });
            await loading.present();
            this.taldeaitem.sortzailea = firebase.auth().currentUser.email;
            this.subscription = this.rankingService.getAllRanking().subscribe(res => {
              this.ranking = res;
              this.taldeId = this.route.snapshot.params['id'];
              for (var i = 0; i < this.ranking.length; i++) {
                if (data.name1 == this.ranking[i].Id) {
                  this.partaidea.Id = this.ranking[i].Id;
                  this.partaidea.izena = this.ranking[i].Izena;
                  console.log(this.partaidea)
                  this.taldeakService.addpartaideak(this.partaidea, this.taldeId, this.partaidea.Id)
                }
              }
            });

            // this.ngOnInit();
            await loading.dismiss();
            location.reload()
          }
        }
      ]
    });
    await alert.present();
  }
  async deletegroup() {
    const alert = await this.alertController.create({
      header: 'Taldetik irten?',
      buttons: [
        {
          text: 'Ez',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Bai',
          handler: async data => {
            this.taldeakService.remove(this.route.snapshot.params['id'], firebase.auth().currentUser.email)
            this.ngOnInit();
            this.router.navigateByUrl('/tabs/tab1')
          }
        }
      ]
    });
    await alert.present();
    }
}