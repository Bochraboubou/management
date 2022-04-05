import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionetdemandesComponent } from './inscriptionetdemandes.component';

describe('InscriptionetdemandesComponent', () => {
  let component: InscriptionetdemandesComponent;
  let fixture: ComponentFixture<InscriptionetdemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionetdemandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionetdemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
