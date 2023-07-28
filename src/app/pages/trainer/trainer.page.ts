import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateCardService } from 'src/app/services/update-card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss']
})
export class TrainerPage {

  constructor(private readonly userService:UserService, private readonly router:Router  ){
  }

}
