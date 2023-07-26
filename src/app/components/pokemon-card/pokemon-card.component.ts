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
  orgWeight: number;
  orgHeight: number;

  constructor() {
    this.canFlip = true;
    this.animateDot = false;
    this.animateImage = false;
    this.animateButton = false;
    this.isMetricSystem = false;
    this.orgWeight = -1;
    this.orgHeight = -1;
    //console.log(this.data.name);
  }

  onBackButtonClick() {
    if (this.canFlip == false) return;
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';
  }

  onFrontButtonClick() {
    if (this.canFlip == false) return;

    if(this.orgHeight == -1)
      this.convertWeightAndHeight();

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

    if(this.orgHeight == -1){
      console.log("yes");
      this.orgHeight = this.data.height;
      this.orgWeight = this.data.weight;
      this.data.weight = this.orgWeight / 10
      this.data.height = this.orgHeight / 10
    }

    if (this.isMetricSystem) {
      // Convert from metric to imperial
      this.data.height = this.metersToFeet(this.orgHeight / 10);
      this.data.weight = this.kgsToLbs(this.orgWeight / 10);
  
    } else {
      // Convert from imperial to metric
      this.data.height = this.orgHeight / 10;
      this.data.weight = this.orgWeight / 10;
  
    }
    
    this.isMetricSystem = !this.isMetricSystem;
  }

  kgsToLbs(kgs: number): number {
    // 1 kg is approximately equal to 2.20462262 lbs
    return parseFloat((kgs * 2.20462262).toFixed(1));
  }

  metersToFeet(meters: number): number {
    // 1 meter is equal to 3.28084 feet
    return parseFloat((meters * 3.28084).toFixed(1));
  }


}
