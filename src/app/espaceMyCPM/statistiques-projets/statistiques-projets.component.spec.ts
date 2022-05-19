import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesProjetsComponent } from './statistiques-projets.component';

describe('StatistiquesProjetsComponent', () => {
  let component: StatistiquesProjetsComponent;
  let fixture: ComponentFixture<StatistiquesProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesProjetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
