import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { rankingTask } from '../models/task.interface';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  username;
  isProba = true;

  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: '',
    jokatuta: false,
    azkenengoPartida: []
  };

  subscription: Subscription = new Subscription();

  constructor(private alertController: AlertController, private rankingService: ErabiltzaileakService) {
    document.getElementsByTagName("ion-tab-bar")[0].hidden = false;
    
    this.subscription = this.rankingService.getErabiltzaile(firebase.auth().currentUser.email).subscribe(res => {
      this.rankingitem = res;

      if (this.rankingitem.jokatuta) {
        this.isProba = false;
      }

      //this.rankingitem.jokatuta = false;
      var htmlString = "";
      console.log(JSON.parse(this.rankingitem.azkenengoPartida[0]));
      for(var i=0; i < this.rankingitem.azkenengoPartida.length; i++){
        /*for(var j=0; j < this.rankingitem.azkenengoPartida[i].split(",").length; j++){
          for(var k=0; k < this.rankingitem.azkenengoPartida[i].split(",")[j].split(":").length; k++){
            console.log(this.rankingitem.azkenengoPartida[i].split(",")[j].split(":")[k]);
          }
        }*/
        var thisJson = JSON.parse(this.rankingitem.azkenengoPartida[i]);
        htmlString += "<b>Galdera: </b>" + thisJson.galdera+"<br/>";
        htmlString += "<b>Erantzun zuzena: </b>" + thisJson.erantzunZuzena+"<br/>";
        htmlString += "<b>Zure erantzuna: </b>" + thisJson.erantzuna+"<br/><br/>";
      }
      document.getElementById("azkenengoPartidaP").innerHTML= htmlString;

      

    });
  }
  /*ionViewWillEnter(){
    
  }*/
  async presentAlert() {
    var htmlString = "";
      console.log(JSON.parse(this.rankingitem.azkenengoPartida[0]));
      for(var i=0; i < this.rankingitem.azkenengoPartida.length; i++){
        /*for(var j=0; j < this.rankingitem.azkenengoPartida[i].split(",").length; j++){
          for(var k=0; k < this.rankingitem.azkenengoPartida[i].split(",")[j].split(":").length; k++){
            console.log(this.rankingitem.azkenengoPartida[i].split(",")[j].split(":")[k]);
          }
        }*/
        var thisJson = JSON.parse(this.rankingitem.azkenengoPartida[i]);
        htmlString += "<b>Galdera: </b>" + thisJson.galdera+"<br/>";
        htmlString += "<b>Erantzun zuzena: </b>" + thisJson.erantzunZuzena+"<br/>";
        htmlString += "<b>Zure erantzuna: </b>" + thisJson.erantzuna+"<br/><br/>";
    

  }
  const alert = await this.alertController.create({
    header: 'Gaurko partida',
    subHeader: JSON.parse(this.rankingitem.azkenengoPartida[0]).galdera,
    message: JSON.parse(this.rankingitem.azkenengoPartida[0]).erantzunZuzena,
    buttons: ['OK']
  });
  await alert.present();
  }
}

