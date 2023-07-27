import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonData, PokemonResult } from '../models/pokemonComponentData';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemonApiFetchResult';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  public pokemonData: PokemonData[] = [];

  constructor(private readonly http: HttpClient) {}

  getPokemonAtLogin(from: number, to: number) {
    
  }

  getPokemons(): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0'
    );
  }

  getPokemonDataFromUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
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
