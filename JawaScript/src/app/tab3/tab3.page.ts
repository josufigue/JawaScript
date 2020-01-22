import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { rankingTask } from '../models/task.interface';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
import { delay } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private erabiltzaile: rankingTask[];
  user;
  Izena: string;
  puntuazioa;
  gmail;

  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: ''
  };

  subscription: Subscription = new Subscription();

  constructor(private alertController: AlertController, private rankingService: ErabiltzaileakService, private loadingController: LoadingController, private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth) {
  }

  ionViewWillEnter() {
    this.subscription = this.rankingService.getErabiltzaile(firebase.auth().currentUser.email).subscribe(res => {
      this.rankingitem = res;
    });
  }

  async update() {
    const alert = await this.alertController.create({
      header: 'Izena aldatu',
      inputs: [
        {
          name: 'name1',
          value: '',
          type: 'text',
          placeholder:  this.rankingitem.Izena,
          id: 'izena'
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
            if (data.name1 != "" || data.name1 != this.Izena) {
              const loading = await this.loadingController.create({
                message: 'Gordetzen...'
              });
              await loading.present();
              this.rankingitem.Izena = data.name1;
              this.rankingService.updateRanking(this.rankingitem, this.rankingitem.Id)

              await loading.dismiss();
            }
            else {
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
    console.log((document.getElementById("izena") as HTMLInputElement).value)
  }



  onLogout() {
    console.log('Logout!');
    this.subscription.unsubscribe();
    this.afAuth.auth.signOut();
    location.reload();
  }
}
