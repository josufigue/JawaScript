import { Component, OnInit } from '@angular/core';

import { gald } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  galderaitem: gald = {
    Erantzun1: '',
    Erantzun2: '',
    ErantzunZuzena: '',
    Galdera: ''
  }

  constructor(private route: ActivatedRoute, private nav: NavController, private TodogalderakService: TodogalderakService, private loadingController: LoadingController) { }

  ngOnInit() {
  }
  async saveAll() {

    const loading = await this.loadingController.create({
      message: 'Saving...'
    });
    await loading.present();
    this.galderaitem.Galdera = ((document.getElementById("galdera") as HTMLInputElement).value);
    this.galderaitem.ErantzunZuzena = ((document.getElementById("erantzunZ") as HTMLInputElement).value);
    this.galderaitem.Erantzun1 = ((document.getElementById("erantzun1") as HTMLInputElement).value);
    this.galderaitem.Erantzun2 = ((document.getElementById("erantzun2") as HTMLInputElement).value);

    this.TodogalderakService.addGalderak(this.galderaitem).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/add');
      this.galderaitem.Galdera = ((document.getElementById("galdera") as HTMLInputElement).value) = '';
      this.galderaitem.ErantzunZuzena = ((document.getElementById("erantzunZ") as HTMLInputElement).value) = '';
      this.galderaitem.Erantzun1 = ((document.getElementById("erantzun1") as HTMLInputElement).value) = '';
      this.galderaitem.Erantzun2 = ((document.getElementById("erantzun2") as HTMLInputElement).value) = '';
    })
  }
}
