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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private erabiltzaile: rankingTask[];
  username;
  Izena;
  puntuazioa;
  gmail;

  subscription: Subscription = new Subscription();

  constructor(private rankingService: ErabiltzaileakService, private loadingController: LoadingController, private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subscription = this.rankingService.getAllErabiltzaile().subscribe(res => {
      this.erabiltzaile = res;
    });
    // var lista = this.erabiltzaile.length;

    (async () => {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      console.log(this.erabiltzaile);
      this.comprobar();
      await loading.dismiss();

    })();
  }

  comprobar() {
    for (var x = 0; x < this.erabiltzaile.length; x++) {
      if (this.erabiltzaile[x].erabiltzaileId == firebase.auth().currentUser.uid) {
        this.gmail = this.erabiltzaile[x].Id;
        this.Izena = this.erabiltzaile[x].Izena;
        this.puntuazioa = this.erabiltzaile[x].Puntuazioa;
        console.log(this.gmail);
        break;
      }

    }
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
