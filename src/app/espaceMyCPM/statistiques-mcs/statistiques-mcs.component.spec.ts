import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesMCsComponent } from './statistiques-mcs.component';

describe('StatistiquesMCsComponent', () => {
  let component: StatistiquesMCsComponent;
  let fixture: ComponentFixture<StatistiquesMCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesMCsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesMCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
