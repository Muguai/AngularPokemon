import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  FlavorTextEntry,
  Pokemon,
  PokemonSpecies,
} from 'src/app/models/pokemonApiFetchResult';
import {
  PokemonData,
  defaultPokemonData,
  AdditionalPokemonData,
  defaultAdditionalPokemonData,
} from 'src/app/models/pokemonComponentData';
import { User } from 'src/app/models/user';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateCardService } from 'src/app/services/update-card.service';
import { Subscription } from 'rxjs';
import { speciesUrl } from 'src/app/const/pokeUrl';

interface storeAdditionalData {
  name: string;
  additionalData: AdditionalPokemonData;
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @ViewChild('cardContainer', { static: true }) cardContainerRef!: ElementRef;
  @ViewChild('cardImg', { static: true }) cardImgRef!: ElementRef;
  @ViewChild('pokeBallButton', { static: true }) pokeBallButtonRef!: ElementRef;

  @Input() data: PokemonData = defaultPokemonData;
  @Input() additionalData: AdditionalPokemonData = defaultAdditionalPokemonData;

  @Output() removePokemonFromList: EventEmitter<PokemonData> =
    new EventEmitter<PokemonData>();

  canFlip: boolean;
  animateDot: boolean;
  animateImage: boolean;
  animateButton: boolean;
  isMetricSystem: boolean;
  isLoading: boolean;
  orgWeight: number;
  orgHeight: number;
  isDisabled: boolean;
  isPixel: boolean;
  pokedexShown: boolean;
  isPokedexLoading: boolean;

  pokedexRoute: boolean = false;
  trainerRoute: boolean = false;

  private eventSubscription: Subscription;

  constructor(
    public route: Router,
    public readonly pokeApi: PokeApiService,
    private userService: UserService,
    private updateCardService: UpdateCardService
  ) {
    this.canFlip = true;
    this.animateDot = false;
    this.animateImage = false;
    this.animateButton = false;
    this.isMetricSystem = false;
    this.orgWeight = -1;
    this.orgHeight = -1;
    this.isLoading = false;
    this.isDisabled = false;
    this.isPixel = false;
    this.pokedexShown = false;
    this.isPokedexLoading = false;

    this.pokedexRoute = this.route.url === '/pokedex';
    this.trainerRoute = this.route.url === '/trainer';

    this.eventSubscription = this.updateCardService
      .getEvent()
      .subscribe((eventData) => {
        this.isPixel = eventData;
        console.log('Event data received:', eventData);
      });
  }

  ngOnInit(): void {
    this.orgWeight = -1;
    this.orgHeight = -1;
    this.isDisabled = this.isCatched();
    this.isPixel = this.updateCardService.getIsPixel();

    console.log(this.isDisabled);
  }

  onBackButtonClick() {
    if (this.canFlip == false) return;
    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(0deg)';
  }

  onFrontButtonClick() {
    if (this.canFlip == false || this.data.id == null) return;

    const additionalPokemonDataListStr = sessionStorage.getItem(
      'Additional-Poke-Data'
    );

    let additionalPokemonDataList: storeAdditionalData[] = [];
    if (additionalPokemonDataListStr) {
      additionalPokemonDataList = JSON.parse(additionalPokemonDataListStr);
    }

    const storedData = additionalPokemonDataList.find(
      (additionalData) => additionalData.name === this.data.name
    );

    const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
    cardContainer.style.transform = 'rotateY(180deg)';

    if (storedData) {
      this.additionalData = storedData.additionalData;
      console.log(
        `FOUND STORED DATA FOR ${this.data.name}`,
        this.additionalData
      );
      if (this.isMetricSystem == false) this.isMetricSystem = true;

      const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
      cardContainer.style.transform = 'rotateY(180deg)';
      return;
    }
    this.isLoading = true;

    if (this.orgHeight == -1) this.convertWeightAndHeight();
    this.pokeApi
      .getPokemonById(this.data.id)
      .pipe(
        map((response: Pokemon) => {
          return {
            height: response.height / 10,
            weight: response.weight / 10,
            abilities: response.abilities,
            type: response.types,
            pokeDexEntry: response.species.url,
          };
        })
      )
      .subscribe({
        next: (additionalData: AdditionalPokemonData) => {
          this.additionalData = additionalData;
          console.log(
            `JUST GOT DATA FROM POKEMON - ${this.data.name}'`,
            additionalData
          );

          const newAdditionalPokemonData: storeAdditionalData = {
            name: this.data.name,
            additionalData: additionalData,
          };
          additionalPokemonDataList.push(newAdditionalPokemonData);
          this.isLoading = false;

          if (this.orgHeight == -1) this.convertWeightAndHeight();

          sessionStorage.setItem(
            'Additional-Poke-Data',
            JSON.stringify(additionalPokemonDataList)
          );
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  getPokedexEntries() {
    this.isPokedexLoading = true;

    if (this.pokedexShown) {
      this.isPokedexLoading = false;
      this.pokedexShown = false;
      return;
    } else {
      this.pokedexShown = true;
    }

    const pokedexUrl = this.additionalData.pokeDexEntry;

    if (!pokedexUrl.startsWith(speciesUrl)) {
      this.isPokedexLoading = false;
      console.log('Already got Pokedex entry');
      return;
    }

    this.pokeApi
      .getPokemonSpeciesDataFromUrl(pokedexUrl)
      .pipe(
        map((response: PokemonSpecies) => {
          return {
            flavorTextEntry: response.flavor_text_entries,
          };
        })
      )
      .subscribe({
        next: (data: { flavorTextEntry: FlavorTextEntry[] }) => {
          const englishEntry = data.flavorTextEntry.find(
            (entry) => entry.language.name === 'en'
          );

          if (englishEntry) {
            const englishEntry2 = englishEntry.flavor_text.replace(/\r?\n/g, ' ');
            this.additionalData.pokeDexEntry = englishEntry2.replace("", ' ');
          } else {
            this.additionalData.pokeDexEntry =
              'No English flavor text available.';
          }
          console.log(
            `JUST GOT POKEDEX DATA FROM POKEMON - ${this.data.name}`,
            this.additionalData.pokeDexEntry
          );

          const newAdditionalPokemonData: storeAdditionalData = {
            name: this.data.name,
            additionalData: this.additionalData,
          };

          const additionalPokemonDataListStr = sessionStorage.getItem(
            'Additional-Poke-Data'
          );
          let additionalPokemonDataList: storeAdditionalData[] = [];

          if (additionalPokemonDataListStr) {
            additionalPokemonDataList = JSON.parse(
              additionalPokemonDataListStr
            );

            const existingDataIndex = additionalPokemonDataList.findIndex(
              (pokemon) => pokemon.name === this.data.name
            );

            if (existingDataIndex !== -1) {
              additionalPokemonDataList[existingDataIndex] =
                newAdditionalPokemonData;
              sessionStorage.setItem(
                'Additional-Poke-Data',
                JSON.stringify(additionalPokemonDataList)
              );
            }
          }
          this.isPokedexLoading = false;
        },
        error: (error: any) => {
          this.isPokedexLoading = false;
          console.log(error);
        },
      });
  }

  isCatched(): boolean {
    for (let pokemon of this.userService.getUserDetails().pokemon) {
      if (pokemon.id === this.data.id) {
        return true;
      }
    }

    return false;
  }

  catchPokemon() {
    console.log('Catching ' + this.data);

    this.userService.postPokemon(this.data).subscribe({
      next: (updatedUser: User) => {
        this.animateButton = true;
        this.animateImage = true;
        this.userService.setUser(updatedUser);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  removePokemon() {
    this.userService
      .removePokemon(this.data, this.userService.getUserDetails().pokemon)
      .subscribe({
        next: (updatedUser: User) => {
          this.removePokemonFromList.emit(this.data);
          this.userService.setUser(updatedUser);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName.split('_')[2] == 'buttonAnimation2') {
      this.animateDot = true;
    }
    if (event.animationName.split('_')[2] == 'buttonAnimation3') {
      this.isDisabled = true;
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
    if (this.isLoading) return;

    //Initialize Values
    if (this.orgHeight == -1) {
      this.orgHeight = this.additionalData.height;
      this.orgWeight = this.additionalData.weight;
    }

    if (this.isMetricSystem) {
      this.additionalData.height = this.metersToFeet(this.orgHeight);
      this.additionalData.weight = this.kgsToLbs(this.orgWeight);
    } else {
      this.additionalData.height = this.orgHeight;
      this.additionalData.weight = this.orgWeight;
    }

    this.isMetricSystem = !this.isMetricSystem;
  }

  kgsToLbs(kgs: number): number {
    return parseFloat((kgs * 2.20462262).toFixed(1));
  }

  metersToFeet(meters: number): number {
    return parseFloat((meters * 3.28084).toFixed(1));
  }
}
