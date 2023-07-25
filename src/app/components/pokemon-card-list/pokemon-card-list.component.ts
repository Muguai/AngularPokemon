import { Component, OnInit  } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonResult, Result, PokemonData } from 'src/app/models/pokemonResult';
import { Pokemon, Sprites } from 'src/app/models/pokemonData';
import { switchMap, forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
  styleUrls: ['./pokemon-card-list.component.scss']
})
export class PokemonCardListComponent{
  public pokemonData:PokemonData[] = [];

  constructor(private readonly pokeApiService:PokeApiService){

  }
  /*
  ngOnInit(): void {
    this.pokeApiService.getPokemons()
    .pipe(
      switchMap((pokemonResult) => {
        const urls = pokemonResult.results.map((result) => result.url);

        const observablesArray = urls.map((url) => this.pokeApiService.getPokemonDataFromUrl(url));
        console.log(observablesArray);

        return forkJoin(observablesArray);
      }),
      map((responses: Pokemon[]) => {
        // Here, 'responses' will be an array containing the responses from each URL
        // We need to extract the 'name' and 'sprites' properties from each 'Pokemon' object
        const pokemonDataArray = responses.map((pokemon) => {
          return { name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1), sprite: pokemon.sprites.front_default };
        });
        return pokemonDataArray;
      })
    )
    .subscribe({
      next: (pokemonDataArray: { name: string; sprite: string }[])=> {
        this.pokemonData = pokemonDataArray;
        console.log(this.pokemonData);
      },
      error: (error => {
          console.log(error)
      })
  })
  }
  */
}
