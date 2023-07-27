import { Component } from '@angular/core';
import { UpdateCardService } from 'src/app/services/update-card.service';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss']
})
export class TrainerPage {
  isPixel:boolean;

  constructor(private readonly updateCardService:UpdateCardService ){
    this.isPixel = true;
  }

  changeArt(){
    console.log("Change art");
    this.isPixel = !this.updateCardService.getIsPixel();
    console.log(this.isPixel  + " Change art " + this.updateCardService.getIsPixel());


    this.updateCardService.emitEvent(this.isPixel);
  }

}
