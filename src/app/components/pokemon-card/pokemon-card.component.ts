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

  @Input() data: PokemonData = { name: "MissingNo", image: "assets/images/MissingNo.png" };

  animateButton = false;

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
    console.log('Catching ' + this.data.name);
  }

  onAnimationEnd(){
    this.animateButton = false;
  }
}