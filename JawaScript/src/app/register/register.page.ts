import { Component, OnInit, NgModule, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { rankingTask } from '../models/task.interface';
import { TodorankingService } from '../services/todoranking.service';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements AfterContentInit {
  user: User = new User();

  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: ''
  };

  constructor(private authSvc: AuthService, private router: Router, private TodorankingService: TodorankingService, private toastController: ToastController) { }

  ngAfterContentInit() {
    try{
      document.getElementsByTagName("ion-tab-bar")[0].hidden = true;
    }
    catch(error){
      console.log("error: "+error);
    }
  }

  async onRegister() {
    if (document.getElementById("pss").textContent == document.getElementById("pssr").textContent) {
      const user = await this.authSvc.onRegister(this.user);
      if (user) {
        console.log('Successfully created user!');
        this.inicialranking();
        this.router.navigateByUrl('/tabs/tab1');
      }
    }
    else {
      const toast = await this.toastController.create({
        message: "Pasahitzak ez dira berdinak",
        duration: 1000,
        position: "middle",
      });
      toast.present();
    }
  }

  inicialranking() {
    this.rankingitem.Id = firebase.auth().currentUser.email;
    this.rankingitem.erabiltzaileId = firebase.auth().currentUser.uid;
    this.rankingitem.Izena = firebase.auth().currentUser.email.split('@')[0];
    this.rankingitem.Puntuazioa = 0;
    this.TodorankingService.addRanking(this.rankingitem, this.rankingitem.Id);
    console.log(this.rankingitem);
  }

}
