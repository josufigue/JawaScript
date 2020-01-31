import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'galdera',
    loadChildren: () => import('./galdera/galdera.module').then(m => m.GalderaPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'rankinga/:id',
    loadChildren: './ranking/ranking/ranking.module#RankingPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'ranking',
    loadChildren: './ranking/ranking.module#RankingPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'rankingD',
    loadChildren: './ranking/ranking/ranking.module#RankingPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'taldeak',
    loadChildren: () => import('./taldeak/taldeak.module').then( m => m.TaldeakPageModule)
  },
  {
    path: 'taldea/:id',
    loadChildren: () => import('./taldeak/taldea/taldea.module').then( m => m.TaldeaPageModule)
  },
  {
    path: 'checkgalderak',
    loadChildren: () => import('./checkgalderak/checkgalderak.module').then( m => m.CheckgalderakPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
