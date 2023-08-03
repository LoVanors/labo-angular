import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTournamentComponent } from './single-tournament.component';

describe('SingleTournamentComponent', () => {
  let component: SingleTournamentComponent;
  let fixture: ComponentFixture<SingleTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleTournamentComponent]
    });
    fixture = TestBed.createComponent(SingleTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
