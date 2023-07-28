import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonResult } from '../models/pokemonComponentData';
import { Observable } from 'rxjs';
import { Pokemon, PokemonSpecies } from '../models/pokemonApiFetchResult';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {

  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      'https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0'
    );
  }

  getPokemonDataFromUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
  getPokemonSpeciesDataFromUrl(url: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(url);
  }

  getPokemonBetweenNum(limit: number, offset: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  }
}
