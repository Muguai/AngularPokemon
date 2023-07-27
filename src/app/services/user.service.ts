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

  getUser(name: string): Observable<User> {
    
    console.log('user', name);

    return this.http.get<User>(
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

  postPokemon(catchedPokemon: PokemonData) {
    // console.log(this._user)
    // const updatedPokemons = this._user.pokemon;
    // updatedPokemons.push(catchedPokemon);
    
    // console.log(updatedPokemons)

    console.log(this.http.patch(`${this.API_URL}/trainers/${this._user.id}`, 
      `pokemon: ${[...this._user.pokemon, catchedPokemon]}`,
      {headers: this.httpHeaders})); 
    
    //this._user.pokemon.push(catchedPokemon);
    console.log()
  }

  removePokemon(catchedPokemon: PokemonData) {
    
  }
}
