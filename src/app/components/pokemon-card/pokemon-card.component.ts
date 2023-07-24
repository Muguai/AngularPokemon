import { Component, Input, ViewChild, ElementRef } from '@angular/core';

interface PokemonData {
  name: string;
  image: string;
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @ViewChild('cardContainer', { static: true }) cardContainerRef!: ElementRef;
  @ViewChild('cardImg', { static: true }) cardImgRef!: ElementRef;
  @ViewChild('pokeBallButton', { static: true }) pokeBallButtonRef!: ElementRef;


  @Input() data: PokemonData = { name: "MissingNo", image: "assets/images/MissingNo.png" };

  animateButton = false;
  animateImage = false;
  animateDot = false;

  constructor() {
    console.log(this.data.name);
  }

  onBackButtonClick() {
    console.log('Back button clicked!');
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';

  }

  onFrontButtonClick() {
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