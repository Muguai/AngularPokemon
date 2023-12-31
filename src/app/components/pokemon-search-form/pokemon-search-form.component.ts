import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { PokemonData, PokemonResult, Result } from 'src/app/models/pokemonComponentData';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { spriteUrl, altSpriteUrl} from 'src/app/const/pokeUrl';


@Component({
  selector: 'app-pokemon-search-form',
  templateUrl: './pokemon-search-form.component.html',
  styleUrls: ['./pokemon-search-form.component.scss']
})
export class PokemonSearchFormComponent {

  @Output() searchMade: EventEmitter<PokemonData[]> = new EventEmitter<PokemonData[]>();
  @Output() resetSearchClick: EventEmitter<any> = new EventEmitter();

  hasSearched: boolean;

  constructor(private readonly pokeApiService:PokeApiService){
    this.hasSearched = false;
  }

  search (form: NgForm){

    if(form.value.searchBar.length == 0 || form.value.searchBar == ""){
      this.resetSearch();
      return;
    }

    this.pokeApiService.getPokemons()
    .pipe(
      map((responses: PokemonResult)=> {
        const searchedPokemon: Result[] = responses.results.filter((pokemon) => {
          const pokemonName = pokemon.name.toLowerCase();
          const searchTerm = form.value.searchBar.toLowerCase();
        
          return pokemonName.startsWith(searchTerm);
        });
        return searchedPokemon;
      }),
      map((filteredResults: Result[]) => {
        const pokemonDataArray: PokemonData[] = filteredResults.map((pokemon: Result) => {
          const splitUrl = pokemon.url.split("/");
          const calculateId = splitUrl[splitUrl.length - 2];    
          return {
            name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
            id: parseInt(calculateId),
            sprite: (spriteUrl + calculateId + '.png'),
            altSprite: (altSpriteUrl + calculateId + '.png'),
            additionalInfoUrl: pokemon.url,
          };
        });
        return pokemonDataArray;
      })
    )
    .subscribe({
      next: (value) => {
        this.hasSearched = true;
        this.searchMade.emit(value);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  resetSearch(){
    this.hasSearched = false;
    this.resetSearchClick.emit();
  }


}
