import { Component, OnInit } from '@angular/core';

import { gald, rankingTask, partaideak, taldea } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
import { MitaldeService } from '../services/mitalde.service'
import { delay } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import * as firebase from 'firebase/app';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage {

  private galderak: gald[];
  private galderakArray: gald[] = [];
  private ids = [];
  primerRandom;
  loading;
  index: number = 0;

  timePassed: number = 0;
  interval;

  erantzunak = [];
  puntuazioa = 0;
  puntuazioTot;

  rankingitem: rankingTask = {
    Id: '',
    Izena: '',
    Puntuazioa: 0,
    erabiltzaileId: '',
    jokatuta: '',
    azkenengoPartida: []
  };

  partaidea: partaideak = {
    Id: '',
    izena: '',
    puntuazioa: 0
  }

  subscription: Subscription = new Subscription();
  subscription1: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();
  currentDate;


  
  misgrupos: taldea[] = [];
  h;i;j;
  taldeakitem: any;
  taldeak: any;

  constructor(private taldeaservice: MitaldeService, private galderakService: TodogalderakService, private rankingService: ErabiltzaileakService, private loadingController: LoadingController, private router: Router, public http: Http) { }

  ionViewWillEnter() {
    this.subscription = this.rankingService.getErabiltzaile(firebase.auth().currentUser.email).subscribe(res => {
      this.rankingitem = res;

      this.startGalderak();
    });



    let url = "https://worldtimeapi.org/api/timezone/Europe/Madrid";

    this.http.get(url).pipe(map(res => res.json())).subscribe(data => {

      this.currentDate = (data.datetime.split("T")[0]);

    });
  }
  startGalderak() {
    this.galderakService.getAllGalderak().subscribe(res => {
      this.galderak = res;


      for (var i = 0; i < 10; i++) {
        this.primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
        if (this.ids.includes(this.galderak[this.primerRandom].id)) {
          i--;
          console.log("Repeated ID: " + this.galderak[this.primerRandom].id);
        }
        else {
          this.galderakArray.push(this.galderak[this.primerRandom]);
          this.ids.push(this.galderak[this.primerRandom].id);
        }
      }
      delete this.galderak;
      console.log(this.galderakArray);

      this.startTimer();
      this.randomOrderAnswer();
    });
  }

  randomOrderAnswer() {
    (async () => {
      this.loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await this.loading.present();
      document.getElementById("irudiaSpan").innerHTML = "";


      await this.loading.dismiss();

        if (this.galderakArray[this.index].Irudia != undefined) {
          document.getElementById("irudiaSpan").innerHTML = "<img src='" + this.galderakArray[this.index].Irudia + "' style='max-width:200px;max-height:250px;margin-left:20%;margin-top:10%;margin-bottom:-10%;'/>"
        }


      document.getElementById("galderaP").textContent = this.galderakArray[this.index].Galdera;
      switch (Math.floor(Math.random() * 6) + 1) {
        case 1:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].Erantzun1;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].Erantzun2;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          break;
        case 2:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].Erantzun1;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].Erantzun2;
          break;
        case 3:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].Erantzun2;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].Erantzun1;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          break;
        case 4:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].Erantzun2;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].Erantzun1;
          break;
        case 5:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].Erantzun2;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].Erantzun1;
          break;
        case 6:
          document.getElementById("option1btn").textContent = this.galderakArray[this.index].ErantzunZuzena;
          document.getElementById("option2btn").textContent = this.galderakArray[this.index].Erantzun1;
          document.getElementById("option3btn").textContent = this.galderakArray[this.index].Erantzun2;
          break;
      }
    })();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timePassed++;
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  clickAnswer(id) {

    (async () => {

      

      var erantzuna = document.getElementById(id).textContent;
      console.log("erantzuna", erantzuna);
      var erantzunZuzena = this.galderakArray[this.index].ErantzunZuzena;
      console.log("erantzunZuzena", erantzunZuzena);
      if (erantzuna == erantzunZuzena) {
        document.getElementById(id).style.backgroundColor = "green";
        var audio = new Audio('../../assets/music/correctAnswer.mp3');
        audio.play();
        this.puntuazioa++;
      }
      else {
        var audio = new Audio('../../assets/music/wrongAnswer.mp3');
        audio.play();
      }
      var jsonstring = { 'id': this.galderakArray[this.index].id, 'galdera': this.galderakArray[this.index].Galdera, 'erantzunZuzena': erantzunZuzena, 'erantzuna': erantzuna };
      this.erantzunak.push(JSON.stringify(jsonstring));

      this.index++;

      if (this.index == 10) {
        this.pauseTimer();
        console.log("time: " + this.timePassed);
        if (this.puntuazioa != 0) {
          this.puntuazioTot = 1000 / ((this.puntuazioa + this.timePassed / 10) + ((10 - this.puntuazioa) * 3));
        }
        else {
          this.puntuazioTot = 0;
        }
        console.log(this.puntuazioTot);
        this.rankingitem.Puntuazioa += this.puntuazioTot;
        this.rankingitem.azkenengoPartida = this.erantzunak;
        this.rankingitem.jokatuta = this.currentDate;
        this.rankingService.updateRanking(this.rankingitem, this.rankingitem.Id)
        this.partaidea.Id = this.rankingitem.Id
        this.partaidea.izena = this.rankingitem.Izena
        this.partaidea.puntuazioa = this.rankingitem.Puntuazioa

        
        this.subscription1.unsubscribe()
        this.subscription2.unsubscribe()
        this.taldeakitem = []
        this.h = 0
        this.i = 0
        this.j = 0
        this.taldeak = []
        this.subscription1 = this.taldeaservice.getAlltaldeak().subscribe(res => {
          this.taldeakitem = res;
          for (this.i = 0; this.i < this.taldeakitem.length; this.i++) {
            this.taldeak = []
            this.subscription2 = this.taldeaservice.getPartaideak(this.taldeakitem[this.i].izena).subscribe(res2 => {
              this.taldeak = res2;
              for (this.j = 0; this.j < this.taldeak.length; this.j++) {
                if (firebase.auth().currentUser.email == this.taldeak[this.j].Id && this.taldeak[this.j].Id != undefined) {
                  console.log(this.taldeakitem[this.h])
                  this.taldeaservice.updatetaldeak(this.partaidea, this.taldeakitem[this.h].izena, firebase.auth().currentUser.email)
                }
              }
              this.h++;
            });
          }
        });

        // this.taldeaservice.updatetaldeak(this.partaidea,, this.rankingitem.Id)
        this.router.navigateByUrl('/tabs/tab1');
      }
      else{
        this.randomOrderAnswer();
      }
    })();
  }


}
