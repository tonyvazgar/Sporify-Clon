import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( module => module.AuthModule)
  },
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then( module => module.HomeModule),
    canActivate: [SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
