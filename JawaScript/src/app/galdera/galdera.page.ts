import { Component, OnInit } from '@angular/core';

import { gald } from '../models/task.interface';
import { TodogalderakService } from '../services/todogalderak.service'
@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  galderak: gald[];
  ids = [];
  constructor(private galderakService: TodogalderakService) { }

  ngOnInit() {
    this.galderakService.getAllGalderak().subscribe(res => {
      this.galderak = res;
    });
    (async () => {
      await this.delay(1500);
      console.log(this.galderak);
      this.randomOrderAnswer();
    })();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

   randomOrderAnswer(){
    
     var galderaSlide = $(".galderaSlide");
     var primerRandom = (Math.floor(Math.random()* this.galderak.length)+1);
     console.log(this.galderak[primerRandom]);
     this.ids.push(this.galderak[primerRandom].Galdera);
     var html = '<b><p lines="inset" button > '+ this.galderak[primerRandom].Galdera +' </p></b>';
     switch(Math.floor(Math.random() * 6)+1){
       case 1:
          html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button>'
         break;
       case 2:
        html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button>'
         break;
       case 3:
        html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button>'
         break;
       case 4:
        html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button>'
         break;
       case 5:
        html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button>'
         break;
       case 6:
        html += '<ion-button lines="inset" button >'+this.galderak[primerRandom].ErantzunZuzena+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun2+'</ion-button><ion-button lines="inset" button >'+this.galderak[primerRandom].Erantzun1+'</ion-button>'
         break;
     }
     $(".galderaSlide").html(html);
   }


}
