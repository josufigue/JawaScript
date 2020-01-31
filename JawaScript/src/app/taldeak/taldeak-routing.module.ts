import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaldeakPage } from './taldeak.page';

const routes: Routes = [
  {
    path: '',
    component: TaldeakPage
  },  {
    path: 'taldea',
    loadChildren: () => import('./taldea/taldea.module').then( m => m.TaldeaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaldeakPageRoutingModule {}
