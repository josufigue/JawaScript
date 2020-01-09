import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  check(izena){
    if(izena == 'olaia'){
      alert("Oso ondo!");
    }
    else{
      alert("ohhh, erantzun okerra");
    }
  }

}
