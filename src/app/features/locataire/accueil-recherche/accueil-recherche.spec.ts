import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilRecherche } from './accueil-recherche';

describe('AccueilRecherche', () => {
  let component: AccueilRecherche;
  let fixture: ComponentFixture<AccueilRecherche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilRecherche],
    }).compileComponents();

    fixture = TestBed.createComponent(AccueilRecherche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
