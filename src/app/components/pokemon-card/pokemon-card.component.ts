import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemonApiFetchResult';
import { PokemonData, defaultPokemonData, AdditionalPokemonData, defaultAdditionalPokemonData } from 'src/app/models/pokemonComponentData';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { UserService } from 'src/app/services/user.service';


interface storeAdditionalData {
  name: string;
  additionalData: AdditionalPokemonData;
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @ViewChild('cardContainer', { static: true }) cardContainerRef!: ElementRef;
  @ViewChild('cardImg', { static: true }) cardImgRef!: ElementRef;
  @ViewChild('pokeBallButton', { static: true }) pokeBallButtonRef!: ElementRef;

  @Input() data: PokemonData = defaultPokemonData;
  @Input() additionalData: AdditionalPokemonData = defaultAdditionalPokemonData;

  canFlip: boolean;
  animateDot: boolean;
  animateImage: boolean;
  animateButton: boolean;
  isMetricSystem: boolean;
  orgWeight: number;
  orgHeight: number;

  pokedexRoute: Boolean = false;
  trainerRoute: Boolean = false;

  constructor(public route: Router, 
              public readonly pokeApi:PokeApiService,
              private userService: UserService) {
    this.canFlip = true;
    this.animateDot = false;
    this.animateImage = false;
    this.animateButton = false;
    this.isMetricSystem = false;
    this.orgWeight = -1;
    this.orgHeight = -1;

    this.pokedexRoute = (this.route.url === '/pokedex')
    this.trainerRoute = (this.route.url === '/trainer')
  }

  onBackButtonClick() {
    if (this.canFlip == false) return;
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';
  }

  onFrontButtonClick() {
    if (this.canFlip == false || this.data.id == null) return;

    const additionalPokemonDataListStr = sessionStorage.getItem("Additional-Poke-Data");

    let additionalPokemonDataList: storeAdditionalData[] = [];
    if (additionalPokemonDataListStr) {
      additionalPokemonDataList = JSON.parse(additionalPokemonDataListStr);
    }

    const storedData = additionalPokemonDataList.find((additionalData) => additionalData.name === this.data.name);
    
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(180deg)';

    if (storedData) {
      this.additionalData = storedData.additionalData;
      console.log(`FOUND STORED DATA FOR ${this.data.name}`, this.additionalData);
      
      if (this.orgHeight == -1)
        this.convertWeightAndHeight();

      const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
      cardContainer.style.transform = 'rotateY(180deg)';
      return;
    }

    this.pokeApi.getPokemonById(this.data.id)
    .pipe(
      map((response: Pokemon) => {
        return {
          height: response.height,
          weight: response.weight,
          abilities: response.abilities,
          type: response.types,
          pokeDexEntry: ""
        };
      })
    ).subscribe({
      next: (additionalData: AdditionalPokemonData) => {      
        this.additionalData = additionalData;
        console.log(`JUST GOT DATA FROM POKEMON - ${this.data.name}'` , additionalData);   

        if(this.orgHeight == -1)
          this.convertWeightAndHeight();


        const newAdditionalPokemonData: storeAdditionalData = {
          name: this.data.name,
          additionalData: additionalData,
        };
        additionalPokemonDataList.push(newAdditionalPokemonData);

        sessionStorage.setItem("Additional-Poke-Data", JSON.stringify(additionalPokemonDataList));
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  }

  catchPokemon() {
    this.animateButton = true;
    this.animateImage = true;
    console.log('Catching ' + this.data.name);

    this.userService.postPokemon(this.data);
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
    if (this.additionalData.type.length === 2) {
      const type1 = this.additionalData.type[0].type.name;
      const type2 = this.additionalData.type[1].type.name;
      return `linear-gradient(to bottom right, var(--${type1}-type-color), var(--${type2}-type-color))`;
    } else if (this.additionalData.type.length === 1) {
      const type = this.additionalData.type[0].type.name;
      return `linear-gradient(to bottom right, var(--${type}-type-color), var(--${type}-type-color-dark)`;
    }
    return ''; 
  }

  convertWeightAndHeight() {

    //Initialize Values
    if(this.orgHeight == -1){
      this.orgHeight = this.additionalData.height;
      this.orgWeight = this.additionalData.weight;
      this.additionalData.weight = this.orgWeight / 10
      this.additionalData.height = this.orgHeight / 10
    }

    if (this.isMetricSystem) {
      this.additionalData.height = this.metersToFeet(this.orgHeight / 10);
      this.additionalData.weight = this.kgsToLbs(this.orgWeight / 10);

    } else {
      this.additionalData.height = this.orgHeight / 10;
      this.additionalData.weight = this.orgWeight / 10;
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
