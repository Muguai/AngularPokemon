import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { PokemonData } from '../models/pokemonComponentData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: User;
  private apiKey: string =
    'QVfU8lGxPO22tNQJzTQIpEh85dZfyq3v7tQ8mvtDfwblpTTrgQLYnXv0RMdi7dah';
    private API_URL: string = 'https://fh-noroff-assignment-api-production.up.railway.app'

    private httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });

  constructor(private readonly http: HttpClient) {}

  getUser(name: string): Observable<User[]> {
    
    console.log('user', name);

    return this.http.get<User[]>(
      `${this.API_URL}/trainers?username=${name}`,
      { headers: this.httpHeaders }
    );
  }

  postUser(newUser: string): Observable<User> {
    return this.http.post<User>(
      `${this.API_URL}/trainers`,
      newUser,
      { headers: this.httpHeaders }
    );
  }


  setUser(user: User): void{
    this._user = user;
  }
  getUserDetails(): User {
    return this._user;
  }

  postPokemon(catchedPokemon: PokemonData): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/trainers/${this._user.id}`, 
      JSON.stringify({pokemon: [...this._user.pokemon, catchedPokemon],}),
      {headers: this.httpHeaders}
      ); 
  }

  removePokemon(catchedPokemon: PokemonData, userPokemons: PokemonData[]): Observable<User> {
    for(let pokemon of userPokemons) {
      if(pokemon.id === catchedPokemon.id)
        userPokemons.splice(pokemon.id, 1)
      else
        console.log("No such pokemon to remove")
    }
      return this.http.patch<User>(`${this.API_URL}/trainers/${this._user.id}`,
      JSON.stringify({pokemon: userPokemons,}),
        {headers: this.httpHeaders}
        );
  }
}
