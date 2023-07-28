import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokedexPage } from './pages/pokedex/pokedex.page';
import { AuthGuard } from './guards/auth.guard';
import { logingFormGuard } from './guards/loging-form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPage,
    canActivate: [logingFormGuard],
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'pokedex',
    component: PokedexPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
