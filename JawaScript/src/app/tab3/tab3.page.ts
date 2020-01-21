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
  Izena:string;
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

  ngOnInit() {
    this.subscription = this.rankingService.getAllErabiltzaile().subscribe(res => {
      this.erabiltzaile = res;

      (async () => {
        const loading = await this.loadingController.create({
          message: 'Loading...'
        });
        await loading.present();
        console.log(this.erabiltzaile);
        this.comprobar();
        await loading.dismiss();
  
      })();
    });
    // var lista = this.erabiltzaile.length;

    
  }

  comprobar() {
    for (var x = 0; x < this.erabiltzaile.length; x++) {
      if (this.erabiltzaile[x].erabiltzaileId == firebase.auth().currentUser.uid) {
        this.gmail = this.erabiltzaile[x].Id;
        this.Izena = this.erabiltzaile[x].Izena;
        this.puntuazioa = this.erabiltzaile[x].Puntuazioa;
        this.user = this.erabiltzaile[x].erabiltzaileId;
        console.log(this.gmail);
        break;
      }

    }
  }

  async update() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          value: 'hello',
          type: 'text',
          placeholder: this.Izena,
          
          id : 'izena'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.rankingitem.Izena =  document.getElementById("izena").innerHTML;
            console.log(this.rankingitem.Izena)
          }
        }, {
          text: 'Ok',
          handler: async data => {
            if ((document.getElementById("izena") as HTMLInputElement).value != "" || (document.getElementById("izena") as HTMLInputElement).value!= this.Izena) {
              const loading = await this.loadingController.create({
                message: 'Saving...'
              });
              await loading.present();
              this.rankingitem.Izena =  document.getElementById("izena").innerHTML;
              this.rankingitem.Id = this.gmail;
              this.rankingitem.Puntuazioa = this.puntuazioa;
              this.rankingitem.erabiltzaileId = this.user;
              this.rankingService.updateRanking(this.rankingitem, this.gmail)
              
              await loading.dismiss();
            } else {
              // invalid login 
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
    this.gmail = '';
    this.Izena = '';
    this.puntuazioa = '';
    this.subscription.unsubscribe();
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
