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
  constructor(private galderakService: TodogalderakService) { }

  ngOnInit() {
    this.galderakService.getAllGalderak().subscribe(res => {
      this.galderak = res;
    });
  }
  check(izena) {
    if (izena == 'olaia') {
      alert("Oso ondo!");
    }
    else {
      alert("ohhh, erantzun okerra");
    }
  }
}
