import { Component, OnChanges, Input, OnInit, SimpleChanges  } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonResult, Result, PokemonData } from 'src/app/models/pokemonComponentData';
import { switchMap, forkJoin, map, of } from 'rxjs';
import { MetricConverterService } from 'src/app/services/metric-converter.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
  styleUrls: ['./pokemon-card-list.component.scss']
})
export class PokemonCardListComponent implements OnInit{
  public pokemonData:PokemonData[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Input() itemsPerPage: number = 39;
  @Input() maxPokemon: number = 1008;
  private speciesUrl: string = "https://pokeapi.co/api/v2/pokemon-species/";
  private spriteUrl: string =   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
 // private spriteUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

  pokedexRoute: Boolean = false;
  trainerRoute: Boolean = false;

  constructor(private readonly pokeApiService:PokeApiService, 
    public readonly route: Router,
    public userService: UserService){
    this.pokedexRoute = (this.route.url === '/pokedex')
    this.trainerRoute = (this.route.url === '/trainer')
  }
  
  ngOnInit(): void {
    this.totalPages = Math.ceil(this.maxPokemon / this.itemsPerPage);
    console.log(this.totalPages);
    this.fetchPokemonData();
  }

  fetchPokemonData() {
    let offset = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;
    if(offset > (this.maxPokemon - limit)){
      limit = this.maxPokemon - offset;
    }
    offset = Math.min(offset, (this.maxPokemon - limit));
    console.log("From " + offset + " to " + (offset + limit) );

    const storedData = sessionStorage.getItem(`PokemonData-From${offset}-To${limit + offset}`);
    if(storedData){
      this.pokemonData = JSON.parse(storedData) as PokemonData[];
      console.log(`DATA - PokemonData-From${offset}-To${offset + limit } - ALREADY STORED`);
      return;
    }
    this.pokeApiService.getPokemonBetweenNum(limit, offset)
      .pipe(
        map((response: PokemonResult) => {
          const pokemonDataArray: PokemonData[] = response.results.map((pokemon) => {
            const splitUrl = pokemon.url.split("/");
            const calculateId = splitUrl[splitUrl.length - 2];
            return {
              name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
              id: parseInt(calculateId),
              sprite: (this.spriteUrl + calculateId + '.png'),
              additionalInfoUrl: pokemon.url,
            };
          });
          return pokemonDataArray;
        })
      )
      .subscribe({
        next: (pokemonDataArray: PokemonData[]) => {
         
          this.pokemonData = pokemonDataArray;
          this.totalPages = Math.ceil(this.maxPokemon / this.itemsPerPage);
          console.log(`JUST GOT DATA - PokemonData-From${offset}-To${offset + limit}`);
          sessionStorage.setItem(`PokemonData-From${offset}-To${offset + limit}`, JSON.stringify(pokemonDataArray));
        },
        error: (error) => {
          console.log(error);
        },
      });

  }

  updateBasedOnSearch(event: PokemonData[]) {
    this.pokemonData = event;
  }

  

  
}
