import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckgalderakPageRoutingModule } from './checkgalderak-routing.module';

import { CheckgalderakPage } from './checkgalderak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckgalderakPageRoutingModule
  ],
  declarations: [CheckgalderakPage]
})
export class CheckgalderakPageModule {}
