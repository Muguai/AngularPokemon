import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginPage } from './pages/login/login.page';
import { PokedexPage } from './pages/pokedex/pokedex.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    LoginFormComponent,
    TrainerPage,
    PokedexPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
