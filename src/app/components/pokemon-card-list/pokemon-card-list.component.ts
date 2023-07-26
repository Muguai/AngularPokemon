import { Component, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonResult, Result, PokemonData } from 'src/app/models/pokemonResult';
import { Ability, Pokemon, Sprites,Ability2, Type } from 'src/app/models/pokemonData';
import { switchMap, forkJoin, map, of } from 'rxjs';
import { MetricConverterService } from 'src/app/services/metric-converter.service';

@Component({
  selector: 'app-pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
  styleUrls: ['./pokemon-card-list.component.scss']
})
export class PokemonCardListComponent implements OnInit{
  public pokemonData:PokemonData[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 39;
  public totalPages: number = 30;
  public maxPokemon: number = 1008;

  constructor(private readonly pokeApiService:PokeApiService){

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
        switchMap((pokemonResult) => {
          const urls = pokemonResult.results.map((result) => result.url);
          const observablesArray = urls.map((url) =>
            this.pokeApiService.getPokemonDataFromUrl(url)
          );
          console.log(observablesArray);
          return forkJoin(observablesArray);
        }),
        map((responses: Pokemon[]) => {
          const pokemonDataArray: PokemonData[] = responses.map((pokemon) => {
            return {
              name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
              id: pokemon.id,
              sprite: pokemon.sprites.front_default,
              height: pokemon.height,
              weight: pokemon.weight,
              abilities: pokemon.abilities,
              type: pokemon.types,
              additionalInfoUrl: pokemon.species.url,
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
  onPageChanged(page: number) {
    this.currentPage = page;
    this.fetchPokemonData();
  }

  

  
}
