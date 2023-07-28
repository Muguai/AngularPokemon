import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PokemonCardListComponent } from 'src/app/components/pokemon-card-list/pokemon-card-list.component';
import { PokemonData } from 'src/app/models/pokemonComponentData';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss']
})
export class PokedexPage {
  
  @ViewChild(PokemonCardListComponent) pokemonCardList!: PokemonCardListComponent;
  @ViewChild(PaginationComponent) pagination!: PaginationComponent;
  
  public currentPage: number = 1;
  public totalPages: number = 20 ;
  
  public itemsPerPage: number = 39;
  public maxPokemon: number = 1008;
  constructor(){
    this.totalPages = Math.ceil(this.maxPokemon / this.itemsPerPage);
  }

  onSearchMade(event: PokemonData[]){
    this.pokemonCardList.updateBasedOnSearch(event);
    console.log("pagination: ", this.pagination);
    this.pagination.disable();
  }
  setPageInfo(){
    this.pokemonCardList.currentPage = this.currentPage;
    this.pokemonCardList.totalPages = this.totalPages;
  }
  
  onPageChanged(page: number) {
    this.currentPage = page;
    this.setPageInfo();
    this.pokemonCardList.fetchPokemonData();
  }
  resetSearch(){
    this.pokemonCardList.fetchPokemonData();
    this.pagination.reset();
  }
}
