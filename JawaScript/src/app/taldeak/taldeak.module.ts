import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaldeakPageRoutingModule } from './taldeak-routing.module';

import { TaldeakPage } from './taldeak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaldeakPageRoutingModule
  ],
  declarations: [TaldeakPage]
})
export class TaldeakPageModule {}
