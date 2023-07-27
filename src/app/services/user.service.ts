import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: User;
  private apiKey: string =
    'QVfU8lGxPO22tNQJzTQIpEh85dZfyq3v7tQ8mvtDfwblpTTrgQLYnXv0RMdi7dah';

  constructor(private readonly http: HttpClient) {}

  getUser(loginUser: string): Observable<User[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });
    console.log('user', loginUser);

    return this.http.get<User[]>(
      `https://fh-noroff-assignment-api-production.up.railway.app/trainers?username=${loginUser}`,
      { headers: httpHeaders }
    );
  }

  postUser(newUser: string): Observable<User> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });
  
    return this.http.post<User>(
      `https://fh-noroff-assignment-api-production.up.railway.app/trainers`,
      newUser,
      { headers: httpHeaders }
    );
  }


  setUser(user: User): void{
    this._user = user;
  }
  getUserDetails(): User {
    return this._user;
  }
}
