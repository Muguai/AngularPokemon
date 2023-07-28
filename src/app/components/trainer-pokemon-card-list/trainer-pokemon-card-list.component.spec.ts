import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPokemonCardListComponent } from './trainer-pokemon-card-list.component';

describe('TrainerPokemonCardListComponent', () => {
  let component: TrainerPokemonCardListComponent;
  let fixture: ComponentFixture<TrainerPokemonCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerPokemonCardListComponent]
    });
    fixture = TestBed.createComponent(TrainerPokemonCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
