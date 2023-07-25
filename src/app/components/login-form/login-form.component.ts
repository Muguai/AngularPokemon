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
export class LoginFormComponent {
  userName?: string = '';

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly pokeApiService: PokeApiService
  ) {}


  login(form: NgForm) {
    /*
        let formUser:User= {
            id: 1,
            username: form.value.trainerName,
            pokemon: []
        }

        this.userService.getUser(formUser)
        
        */
    this.pokeApiService.getPokemonAtLogin(0, 40);


    


    localStorage.setItem('username', this.userName!);
    console.log("get here");
    this.router.navigateByUrl('trainer');
  }

  userNameChange(event: any): void {
    this.userName = event.target.value;
  }
}
