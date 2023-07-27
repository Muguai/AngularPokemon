import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  userName?: string = '';
  animateLoad: boolean = false;


  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
  }


  async login(form: NgForm) {
    this.animateLoad = true;
    
    this.userService.getUser(form.value.trainerName).subscribe({
      next: (user) => {
        console.log("Username ", user[0]);
        if (user.length == 0) {
          console.log("--- User doesn't exist --- create user---> ", form.value.trainerName);
          this.userService.postUser(JSON.stringify({
            username: form.value.trainerName,
            pokemon: [],
          })).subscribe({
            next: (user) => {
              console.log(user);   
              this.userService.setUser(user);
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
