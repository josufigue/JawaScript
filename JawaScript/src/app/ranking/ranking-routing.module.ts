import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingPage } from './ranking.page';

const routes: Routes = [
  {
    path: '',
    component: RankingPage
  },
  {
    path: 'ranking',
    loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingPageRoutingModule { }
