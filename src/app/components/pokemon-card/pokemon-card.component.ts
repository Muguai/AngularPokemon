import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PokemonData, defaultPokemonData } from 'src/app/models/pokemonResult';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @ViewChild('cardContainer', { static: true }) cardContainerRef!: ElementRef;
  @ViewChild('cardImg', { static: true }) cardImgRef!: ElementRef;
  @ViewChild('pokeBallButton', { static: true }) pokeBallButtonRef!: ElementRef;
  //@ViewChild('pokedetailsimgbackground', { static: true }) pokedetailsimgbackgroundRef!: ElementRef;

  @Input() data: PokemonData = defaultPokemonData;

  canFlip: boolean;
  animateDot: boolean;
  animateImage: boolean;
  animateButton: boolean;
  isMetricSystem: boolean;

  constructor() {
    this.canFlip = true;
    this.animateDot = false;
    this.animateImage = false;
    this.animateButton = false;
    this.isMetricSystem = false;
    //console.log(this.data.name);
  }

  onBackButtonClick() {
    if (this.canFlip == false) return;
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';
  }

  onFrontButtonClick() {
    if (this.canFlip == false) return;
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(180deg)';
  }

  catchPokemon() {
    this.animateButton = true;
    this.animateImage = true;
    console.log('Catching ' + this.data.name);
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName.split('_')[2] == 'buttonAnimation2') {
      this.animateDot = true;
    }
    if (event.animationName.split('_')[2] == 'buttonAnimation3') {
      const pokeBallButton = this.pokeBallButtonRef
        .nativeElement as HTMLElement;
      pokeBallButton.style.filter = 'brightness(0.6)';
    }
  }

  onAnimationEndImage() {
    const cardImage = this.cardImgRef.nativeElement as HTMLElement;
    cardImage.style.transform = 'translateY(500px)';
  }

  getTypeImageUrl(type: string): string {
    return `/assets/images/types/${type}.png`;
  }

  getGradientStyle(): string {
    if (this.data.type.length === 2) {
      const type1 = this.data.type[0].type.name;
      const type2 = this.data.type[1].type.name;
      return `linear-gradient(to bottom right, var(--${type1}-type-color), var(--${type2}-type-color))`;
    } else if (this.data.type.length === 1) {
      const type = this.data.type[0].type.name;
      return `linear-gradient(to bottom right, var(--${type}-type-color), var(--${type}-type-color-dark)`;
    }
    return ''; 
  }

  convertWeightAndHeight() {
    const tempWeight = this.data.weight;
    const tempHeight = this.data.height;
    if(!this.isMetricSystem){
      this.data.height = this.feetToMeters(tempHeight);
      this.data.weight = this.lbsToKgs(tempWeight);
    }else{
      this.data.height = this.data.heightAlt;
      this.data.weight = this.data.weightAlt;
    }
    
    this.data.heightAlt = tempHeight;
    this.data.weightAlt = tempWeight;
      
    this.isMetricSystem = !this.isMetricSystem;
  }

  
  lbsToKgs(lbs: number): number {
    // 1 lb is approximately equal to 0.45359237 kg
    return parseFloat((lbs * 0.45359237).toFixed(1));
  }
  feetToMeters(feet: number): number {
    // 1 foot is equal to 0.3048 meters
    
    return parseFloat((feet * 0.3048).toFixed(1));
  }



}
