import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginPage } from './pages/login/login.page';
import { PokedexPage } from './pages/pokedex/pokedex.page';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonCardListComponent } from './components/pokemon-card-list/pokemon-card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrainerPokemonCardListComponent } from './components/trainer-pokemon-card-list/trainer-pokemon-card-list.component';
import { PokemonSearchFormComponent } from './components/pokemon-search-form/pokemon-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    LoginFormComponent,
    TrainerPage,
    PokedexPage,
    PokemonCardComponent,
    PokemonCardListComponent,
    PaginationComponent,
    NavbarComponent,
    TrainerPokemonCardListComponent,
    PokemonSearchFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
