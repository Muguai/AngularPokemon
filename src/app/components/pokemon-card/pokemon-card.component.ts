import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonResult';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @ViewChild('cardContainer', { static: true }) cardContainerRef!: ElementRef;
  @ViewChild('cardImg', { static: true }) cardImgRef!: ElementRef;
  @ViewChild('pokeBallButton', { static: true }) pokeBallButtonRef!: ElementRef;


  @Input() data: PokemonData = { name: "MissingNo", sprite: "assets/images/MissingNo.png" };

  canFlip:boolean;
  animateDot:boolean;
  animateImage:boolean;
  animateButton:boolean;

  constructor() {
    this.canFlip = true;
    this.animateDot = false;
    this.animateImage = false;
    this.animateButton = false;
    //console.log(this.data.name);
  }

  onBackButtonClick() {
    if(this.canFlip == false)
      return;
    console.log('Back button clicked!');
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';

  }

  onFrontButtonClick() {
    if(this.canFlip == false)
      return;
    console.log('Front button clicked!');
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(180deg)';
  }

  catchPokemon() {
    this.animateButton = true;
    this.animateImage = true;
    console.log('Catching ' + this.data.name);
  }

  onAnimationEnd(event: AnimationEvent){
    if(event.animationName.split('_')[2] == "buttonAnimation2"){
      this.animateDot = true;
    }
    if(event.animationName.split('_')[2] == "buttonAnimation3"){
      const pokeBallButton = this.pokeBallButtonRef.nativeElement as HTMLElement;
      pokeBallButton.style.filter = "brightness(0.6)";
    }

  }

  
  onAnimationEndImage(){
    const cardImage = this.cardImgRef.nativeElement as HTMLElement;
    cardImage.style.transform = 'translateY(500px)';
  }
}