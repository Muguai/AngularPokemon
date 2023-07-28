import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { UserService } from 'src/app/services/user.service';
import { STORAGE_KEY_USER } from 'src/app/const/storage-keys';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  userName?: string = '';
  animateLoad: boolean = false;

  constructor(private readonly router: Router,
              private readonly userService: UserService) {
  }



  async formLogin(form: NgForm) {
    this.animateLoad = true;
    const username = form.value.trainerName

    this.userService.getUser(username).subscribe({
      next: (user) => {
        console.log("Username ", user[0]);
        if (user.length == 0) {
          console.log("--- User doesn't exist --- create user---> ", username);
          this.userService.postUser(JSON.stringify({
            username: username,
            pokemon: [],
          })).subscribe({
            next: (user) => {
              console.log(user);   
              this.userService.setUser(user);
              sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
              this.router.navigateByUrl('trainer');
            },
            error: (error) => {
              this.animateLoad = false;
              console.log(error);
              // Handle postUser error if needed
            }
          });
        } else {
          this.userService.setUser(user[0]);
          console.log('--- User already exist --- Login in --->', user);
          sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user[0]))
          this.router.navigateByUrl('trainer');
        }
      },
      error: (error) => {
        this.animateLoad = false;
        console.log(error);
      }
    });
    //this.pokeApiService.getPokemonAtLogin(0, 40);
    //localStorage.setItem('username', this.userName!);
  }

  userNameChange(event: any): void {
    this.userName = event.target.value;
  }
}
