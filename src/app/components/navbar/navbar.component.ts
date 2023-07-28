import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public loginUrl :boolean;

  constructor(private router:Router){
    this.loginUrl = (this.router.url === '/') 
    console.log(this.loginUrl);
    router.events.subscribe((event) => 
      this.loginUrl = (this.router.url === '/')  
    )
  }

  

}
