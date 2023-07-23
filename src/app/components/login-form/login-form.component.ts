import { Component } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector:"app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls:["./login-form.component.scss"]
}


)
export class LoginFormComponent{
    userName?:string = "";

    constructor(private readonly router:Router){}

    login(){
        localStorage.setItem('username',this.userName!)
        console.log("get here");
        this.router.navigateByUrl("pokedex");

    }

    userNameChange(event:any):void{
        this.userName = event.target.value;
    }


}
