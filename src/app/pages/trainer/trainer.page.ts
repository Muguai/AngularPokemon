import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEY_USER } from 'src/app/const/storage-keys';
import { UpdateCardService } from 'src/app/services/update-card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss']
})
export class TrainerPage {
  isPixel:boolean;

  constructor(private readonly updateCardService:UpdateCardService, private readonly userService:UserService, private readonly router:Router  ){
    this.isPixel = this.updateCardService.getIsPixel();
  }

  changeArt(){
    console.log("Change art");
    this.isPixel = !this.updateCardService.getIsPixel();
    console.log(this.isPixel  + " Change art " + this.updateCardService.getIsPixel());


    this.updateCardService.emitEvent(this.isPixel);
  }
  logoutClick(){
    console.log("logout");
    sessionStorage.removeItem(STORAGE_KEY_USER);
    this.router.navigateByUrl("/");
  }

}
