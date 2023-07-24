import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonResult } from '../models/pokemonResult'
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemonData';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {



  constructor(private readonly http:HttpClient) { 

  }

  getPokemons():Observable<PokemonResult>{
    return this.http.get<PokemonResult>('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0');

  } 

  getPokemonDataFromUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }


}
