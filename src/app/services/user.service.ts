import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: User;

  constructor(private readonly http: HttpClient) {}

  getUser(user: User): void {
    this.http.get<User>(`http://localhost:3000/users/${user.id}`).subscribe({
      next: (user) => {
        this._user = user;
      },
      error: (error) => {
        this.postUser(user);
      },
    });
  }

  postUser(newUser: User) {
    this.http.post<User>(`http://localhost:3000/users`, newUser).subscribe({
      next: (response) => {
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserDetails(): User {
    return this._user;
  }
}
