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

  getUser2(loginUser: string): Observable<User> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });
    console.log('user', loginUser);

    return this.http.get<User>(
      `https://fh-noroff-assignment-api-production.up.railway.app/trainers?username=${loginUser}`,
      { headers: httpHeaders }
    );
  }

  postUser2(newUser: string): Observable<User> {
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


  getUser(loginUser: string): void {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });

    console.log('user', loginUser);

    this.http
      .get<User>(
        `https://fh-noroff-assignment-api-production.up.railway.app/trainers?username=${loginUser}`,
        { headers: httpHeaders }
      )
      .subscribe({
        next: (user) => {
          console.log(user.username);
          if (user.username == null) {
            console.log("--- User doesn't exist --- create user---> ", loginUser);
            this.postUser(JSON.stringify({
              username: loginUser,
              pokemon: [],
            }));
          } else {
            this._user = user;
            console.log('--- User already exist --- Login in --->', user);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  postUser(newUser: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });

    this.http.post<User>(
      `https://fh-noroff-assignment-api-production.up.railway.app/trainers`,
      newUser,
      { headers: httpHeaders }
    ).subscribe({
      next: (user) => {
        this._user = user;
        console.log(user);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setUser(user: User): void{
    this._user = user;
  }
  getUserDetails(): User {
    return this._user;
  }
}
