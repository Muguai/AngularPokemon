import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonComponentData';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { STORAGE_KEY_USER } from 'src/app/const/storage-keys';

@Component({
  selector: 'app-trainer-pokemon-card-list',
  templateUrl: './trainer-pokemon-card-list.component.html',
  styleUrls: ['./trainer-pokemon-card-list.component.scss']
})

export class TrainerPokemonCardListComponent implements OnInit{
  public user!: User;
  public pokemonData:PokemonData[] = [];

  pokedexRoute: Boolean = false;
  trainerRoute: Boolean = false;

  constructor(public readonly route: Router,
              public userService: UserService){
    this.pokedexRoute = (this.route.url === '/pokedex')
    this.trainerRoute = (this.route.url === '/trainer')
  }
  
  ngOnInit(): void {
    this.getTrainerPokemons();
  }

  getTrainerPokemons() {
    const userData = sessionStorage.getItem(STORAGE_KEY_USER)
    if (userData) {
      this.user = JSON.parse(userData);
      this.pokemonData = this.user.pokemon;
    }
  }

  removePokemonVisuals(event: PokemonData){
    for(let i = 0; i < this.pokemonData.length; i++){
      if(this.pokemonData[i].name === event.name)
        this.pokemonData.splice(i, 1);
    }

  }

}
