import { Component } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
    selector:"app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls:["./login-form.component.scss"]
}


)
export class LoginFormComponent{
    userName?:string = "";

    constructor(private readonly router:Router, 
        private readonly userService:UserService){}

    login(form:NgForm){

        let formUser:User= {
            id: 1,
            username: form.value.trainerName,
            pokemon: []
        }

        this.userService.getUser(formUser)
        

        // localStorage.setItem('username',this.userName!)
        // console.log("get here");
        // this.router.navigateByUrl("pokedex");

    }

    userNameChange(event:any):void{
        this.userName = event.target.value;
    }


}
