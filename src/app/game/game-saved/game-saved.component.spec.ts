import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavedComponent } from './game-saved.component';

describe('GameSavedComponent', () => {
  let component: GameSavedComponent;
  let fixture: ComponentFixture<GameSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
