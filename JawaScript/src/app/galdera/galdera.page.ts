import { Component, OnInit } from '@angular/core';

import { gald } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
import { delay } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  private galderak: gald[];
  private ids = [];
  private i: number;
  loading;
  constructor(private galderakService: TodogalderakService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.galderakService.getAllGalderak().subscribe(res => {
      this.galderak = res;
    });
    (async () => {
      this.loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await delay(3000);
      await this.loading.present();

      var primerRandom = (Math.floor(Math.random() * this.galderak.length) + 1);
      await this.randomOrderAnswer(primerRandom);

      console.log(this.galderak);
    })();
  }

  

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async randomOrderAnswer(primerRandom) {
    await this.loading.present();
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
    await this.loading.dismiss();
    console.log(this.ids.length);
  }

  clickAnswer() {
    (async () => {
      await this.loading.present();
      

      this.i = this.ids.length - 1;
      console.log(this.galderak);
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
    })();
  }


}
