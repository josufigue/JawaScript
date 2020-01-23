import { Component, OnInit } from '@angular/core';

import { gald } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
import { delay } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  private galderak: gald[];
  private ids = [];
  private i: number;
  primerRandom;
  loading;

  timePassed: number = 0;
  interval;

  erantzunak = [];
  puntuazioa = 0;

  constructor(private galderakService: TodogalderakService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.galderakService.getAllGalderak().subscribe(res => {
      this.startTimer();
      this.galderak = res;
      this.primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
      console.log(this.galderak);
      this.randomOrderAnswer(this.primerRandom);
    });
    /*(async () => {
      this.loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await this.loading.present();

      var primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
      await this.randomOrderAnswer(primerRandom);

    })();*/
  }
  mensaje() {
    console.log("Estoy despues del subscribe");
  }

  randomOrderAnswer(primerRandom) {
    (async () => {
      this.loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await this.loading.present();
      document.getElementById("irudiaSpan").innerHTML = "";

      this.ids.push(this.galderak[primerRandom].id);
      console.log(this.ids);
      await this.loading.dismiss();

      if (this.galderak[primerRandom].Irudia != undefined) {
        document.getElementById("irudiaSpan").innerHTML = "<img src='" + this.galderak[primerRandom].Irudia + "' style='max-width:200px;max-height:250px;margin-left:20%;margin-top:10%;margin-bottom:-10%;'/>"
      }


      document.getElementById("galderaP").textContent = this.galderak[primerRandom].Galdera;
      switch (Math.floor(Math.random() * 6) + 1) {
        case 1:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].Erantzun1;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].Erantzun2;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          break;
        case 2:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].Erantzun1;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].Erantzun2;
          break;
        case 3:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].Erantzun2;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].Erantzun1;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          break;
        case 4:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].Erantzun2;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].Erantzun1;
          break;
        case 5:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].Erantzun2;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].Erantzun1;
          break;
        case 6:
          document.getElementById("option1btn").textContent = this.galderak[primerRandom].ErantzunZuzena;
          document.getElementById("option2btn").textContent = this.galderak[primerRandom].Erantzun1;
          document.getElementById("option3btn").textContent = this.galderak[primerRandom].Erantzun2;
          break;
      }
      console.log(this.ids.length);
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
      var erantzunZuzena = this.galderak[this.primerRandom].ErantzunZuzena;
      console.log("erantzunZuzen", erantzunZuzena);
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
      var jsonstring = { 'id': this.galderak[this.primerRandom].id, 'galdera': this.galderak[this.primerRandom].Galdera, 'erantzunZuzena': erantzunZuzena, 'erantzuna': erantzuna };
      this.erantzunak.push(JSON.stringify(jsonstring));


      this.i = this.ids.length - 1;
      for (this.i; this.i < 9; this.i++) {
        this.primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
        if (this.ids.includes(this.galderak[this.primerRandom].id)) {
          this.i--;
        }
        else {
          this.randomOrderAnswer(this.primerRandom);
          break;
        }
      }
      if (this.ids.length == 10) {
        this.pauseTimer();
        console.log("time: " + this.timePassed);
        //console.log("JSON: " + this.erantzunak);
        this.router.navigateByUrl('/tabs/tab1');
      }
    })();
  }


}
