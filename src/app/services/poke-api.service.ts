import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonData, PokemonResult } from '../models/pokemonResult';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemonData';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  public pokemonData: PokemonData[] = [];

  constructor(private readonly http: HttpClient) {}

  getPokemonAtLogin(from: number, to: number) {
    console.log("Session Storage item " , sessionStorage.getItem(`PokemonData-From${from}-To${to}`));
    if(sessionStorage.getItem(`PokemonData-From${from}-To${to}`) == "" && sessionStorage.getItem(`PokemonData-From${from}-To${to}`) == null){
      console.log(`DATA - PokemonData-From${from}-To${to} - ALREADY STORED`);
      return;
    }
    this.getPokemonBetweenNum(from, to)
      .pipe(
        switchMap((pokemonResult) => {
          const urls = pokemonResult.results.map((result) => result.url);
          const observablesArray = urls.map((url) =>
            this.getPokemonDataFromUrl(url)
          );
          console.log(observablesArray);
          return forkJoin(observablesArray);
        }),
        map((responses: Pokemon[]) => {
          const pokemonDataArray = responses.map((pokemon) => {
            return {
              name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
              sprite: pokemon.sprites.front_default,
            };
          });
          return pokemonDataArray;
        })
      )
      .subscribe({
        next: (pokemonDataArray: { name: string; sprite: string }[]) => {
          //this.pokemonData = pokemonDataArray;
          console.log(`JUST GOT DATA - PokemonData-From${from}-To${to}`);

          sessionStorage.setItem(`PokemonData-From${from}-To${to}`, JSON.stringify(pokemonDataArray));
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getPokemons(): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0'
    );
  }

  getPokemonDataFromUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getPokemonBetweenNum(from: number, to: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      `https://pokeapi.co/api/v2/pokemon?limit=${to}&offset=${from}`
    );
  }

  getPokemonById() {}
}
