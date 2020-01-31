import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { rankingTask } from '../models/task.interface';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  username;
  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: '',
    jokatuta: '',
    azkenengoPartida: []
  };

  subscription: Subscription = new Subscription();
  currentDate;

  constructor(private rankingService: ErabiltzaileakService, public http: Http, private router: Router, private toastController: ToastController, private alertController: AlertController) {
    document.getElementsByTagName("ion-tab-bar")[0].hidden = false;

    
  }
  ngOnInit(){
    if (this.rankingitem.jokatuta != this.currentDate){
      console.log("enabled");
      //document.getElementById("jokatuBtn").addEventListener('click', this.redirect);
     
      document.getElementById("jugadoSpan").innerHTML= "";
    }
  }
  ionViewWillEnter(){
    let url = "http://worldtimeapi.org/api/timezone/Europe/Madrid";

    this.subscription = this.rankingService.getErabiltzaile(firebase.auth().currentUser.email).subscribe(res => {
      this.rankingitem = res;

      this.http.get(url).pipe(map(res => res.json())).subscribe(data => {

        this.currentDate = (data.datetime.split("T")[0]);

        var element = document.getElementById("jokatuBtn");
        console.log("Fecha BD: " + this.rankingitem.jokatuta);
        console.log("Fecha ahora: " + this.currentDate);
        if (this.rankingitem.jokatuta == this.currentDate) {
          element.style.visibility = "hidden";
          document.getElementById("jugadoSpan").innerHTML= "<img src='../../assets/icon/img11.png' style='position:absolute;top:20%;left:5%;width:90%'/>";
          //element.removeEventListener('click', this.redirect);
    
          console.log("disabled");
        }
        else {
          console.log("enabled");
          element.style.visibility = "visible";
          document.getElementById("jugadoSpan").innerHTML= "";
          //element.addEventListener('click', this.redirect);
         
        }
      });


    });
  }
  /*redirect() {
    try {
      if (this.rankingitem.jokatuta != this.currentDate) {
        console.log(this.routerLink);
        this.routerLink.navigate('/galdera');
      }
      
    }
    catch(error){
      console.log("Ya has jugado",error);
      //this.showToast();
    }

  }*/
  async showToast() {
    const toast = await this.toastController.create({
      message: "Jadanik jolastu duzu",
      duration: 1000,
      position: "middle",
    });
    toast.present();
  }

  async presentAlert() {
    var htmlString = "";
    console.log(JSON.parse(this.rankingitem.azkenengoPartida[0]));
    for (var i = 0; i < this.rankingitem.azkenengoPartida.length; i++) {
      /*for(var j=0; j < this.rankingitem.azkenengoPartida[i].split(",").length; j++){
        for(var k=0; k < this.rankingitem.azkenengoPartida[i].split(",")[j].split(":").length; k++){
          console.log(this.rankingitem.azkenengoPartida[i].split(",")[j].split(":")[k]);
        }
      }*/
      var thisJson = JSON.parse(this.rankingitem.azkenengoPartida[i]);
      htmlString += "<b>Galdera: </b>" + thisJson.galdera + "<br/>";
      htmlString += "<b>Erantzun zuzena: </b>" + thisJson.erantzunZuzena + "<br/>";
      htmlString += "<b>Zure erantzuna: </b>" + thisJson.erantzuna + "<br/><br/>";

  }
  const alert = await this.alertController.create({
    header: 'Gaurko partida',
    inputs: [
      {
        value: JSON.parse(this.rankingitem.azkenengoPartida[0]).galdera,
        type:'text',
        disabled: true,
        id: 'galdera'
      },
      {
        value: JSON.parse(this.rankingitem.azkenengoPartida[0]).erantzuna,
        type:'text',
        disabled: true,
        id: 'erantzuna'
      },
      {
        value: JSON.parse(this.rankingitem.azkenengoPartida[0]).erantzunZuzena,
        type:'text',
        disabled: true,
        id: 'erantzuna',
      },
    ],
    buttons: ['OK']
  });
  await alert.present();
  }
}

