import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEY_USER } from 'src/app/const/storage-keys';
import { UpdateCardService } from 'src/app/services/update-card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public loginUrl :boolean;
  isPixel:boolean;

  constructor(private router:Router, private readonly updateCardService:UpdateCardService){
    this.loginUrl = (this.router.url === '/') 
    console.log(this.loginUrl);
    router.events.subscribe((event) => 
      this.loginUrl = (this.router.url === '/')  
    )

    this.isPixel = this.updateCardService.getIsPixel();
  }

  logoutClick(){
    console.log("logout");
    sessionStorage.removeItem(STORAGE_KEY_USER);
    this.router.navigateByUrl("/");
  }

  changeArt(){
    console.log("Change art");
    this.isPixel = !this.updateCardService.getIsPixel();
    console.log(this.isPixel  + " Change art " + this.updateCardService.getIsPixel());


    this.updateCardService.emitEvent(this.isPixel);
  }

}
