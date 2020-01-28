import { Component, OnInit } from '@angular/core';
import { rankingTask } from '../models/task.interface';
import * as firebase from 'firebase/app';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-checkgalderak',
  templateUrl: './checkgalderak.page.html',
  styleUrls: ['./checkgalderak.page.scss'],
})
export class CheckgalderakPage implements OnInit {


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

  }
  ionViewWillEnter(){
    this.subscription = this.rankingService.getErabiltzaile(firebase.auth().currentUser.email).subscribe(res => {
    this.rankingitem = res;


 
  

      var htmlString = "";
      for (var i = 0; i < this.rankingitem.azkenengoPartida.length; i++) {
        /*for(var j=0; j < this.rankingitem.azkenengoPartida[i].split(",").length; j++){
          for(var k=0; k < this.rankingitem.azkenengoPartida[i].split(",")[j].split(":").length; k++){
            console.log(this.rankingitem.azkenengoPartida[i].split(",")[j].split(":")[k]);
          }
        }*/
        var thisJson = JSON.parse(this.rankingitem.azkenengoPartida[i]);
        htmlString +="<div id='demo"+i+"'><b>"+(i+1)+" -> Galdera: </b>" + thisJson.galdera + "<br/>";
        htmlString += "<b>Erantzun zuzena: </b>" + thisJson.erantzunZuzena + "<br/>";
        htmlString += "<b>Zure erantzuna: </b>" + thisJson.erantzuna + "<br/><br/></div>";
      }
      document.getElementById("partidajulen").innerHTML = htmlString;

    
      for (var i = 0; i <  this.rankingitem.azkenengoPartida.length; i++) {
       document.getElementById('demo'+i).style.background = 'rgb(236, 236, 236)';
       document.getElementById('demo'+i).style.width = '80%';
       document.getElementById('demo'+i).style.height = '20%';
       document.getElementById('demo'+i).style.padding = '5%';
       document.getElementById('demo'+i).style.border = '2px solid rgb(66, 66, 66)';
       document.getElementById('demo'+i).style.margin = '10%';
       document.getElementById('demo'+i).style.borderRadius = '5px';
       document.getElementById('demo'+i).style.paddingBottom = '-15%';
      }
    
    });

  
    };

  }


