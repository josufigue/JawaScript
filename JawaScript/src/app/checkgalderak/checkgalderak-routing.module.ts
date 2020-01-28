import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckgalderakPage } from './checkgalderak.page';

const routes: Routes = [
  {
    path: '',
    component: CheckgalderakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckgalderakPageRoutingModule {}
