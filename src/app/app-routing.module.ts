import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokedexPage } from './pages/pokedex/pokedex.page';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch:"full",
    component:LoginPage
  },
  {
    path: 'trainer',
    component:TrainerPage,
    canActivate:[authGuard]
  },
  {
    path: 'pokedex',
    component:PokedexPage,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
