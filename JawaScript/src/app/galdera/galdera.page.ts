import { Component, OnInit } from '@angular/core';

import { gald } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
import { delay } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  constructor(private galderakService: TodogalderakService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.galderakService.getAllGalderak().subscribe(res => {
    this.galderak = res;
      this.primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
      console.log(this.galderak);
      this.randomOrderAnswer(this.primerRandom);
    }
    );
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
    this.ids.push(this.galderak[primerRandom].id);
    console.log(this.ids);
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
  }

  clickAnswer() {
    (async () => {
      //await this.loading.present();


      this.i = this.ids.length - 1;
      for (this.i; this.i < 9; this.i++) {
        var primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
        if (this.ids.includes(this.galderak[primerRandom].id)) {
          this.i--;
        }
        else {
          this.randomOrderAnswer(primerRandom);
          break;
        }
      }
      if (this.ids.length == 10) {
        this.router.navigateByUrl('/tabs/tab1');
      }
    })();
  }


}
