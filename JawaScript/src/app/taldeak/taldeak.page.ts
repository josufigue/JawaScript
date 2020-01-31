import { Component, OnInit } from '@angular/core';
import { taldea } from '../models/task.interface';
import { TaldeakService } from '../services/taldeak.service';
import { Subscription } from 'rxjs';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-taldeak',
  templateUrl: './taldeak.page.html',
  styleUrls: ['./taldeak.page.scss'],
})
export class TaldeakPage {
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

  constructor(private loadingController: LoadingController, private taldeakService: TaldeakService, private alertController: AlertController, private taldeaservice: TaldeakService) {

  }
  ionViewWillEnter() {
    this.misgrupos.length=0
    this.subscription.unsubscribe()
    this.subscription1.unsubscribe()
    this.taldeakitem=[]
    this.h=0
    this.i=0
    this.j=0
    this.taldeak = []
    this.subscription = this.taldeaservice.getAlltaldeak().subscribe(res => {
      this.taldeakitem = res;
      for (this.i = 0; this.i < this.taldeakitem.length; this.i++) {
        this.taldeak = []
        this.subscription1 = this.taldeaservice.getPartaideak(this.taldeakitem[this.i].izena).subscribe(res2 => {
          this.taldeak = res2;
          for (this.j = 0; this.j < this.taldeak.length; this.j++) {
            if (firebase.auth().currentUser.email == this.taldeak[this.j].Id && this.taldeak[this.j].Id!= undefined) {
              console.log(this.misgrupos)
              this.misgrupos.push(this.taldeakitem[this.h]);
            }
            else{
              console.log('nosalto')
            }
          }
          this.h++;
        });
      }
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
            this.taldeaitem.izena = data.name1;
            this.taldeakService.addtaldeak(this.taldeaitem, this.taldeaitem.izena)
            await loading.dismiss();
            this.ionViewWillEnter();
          }
        }
      ]
    });
    await alert.present();
  }
  partaideak() {

  }
}
