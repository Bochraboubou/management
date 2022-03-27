import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererComptesComponent } from './gerer-comptes.component';

describe('GererComptesComponent', () => {
  let component: GererComptesComponent;
  let fixture: ComponentFixture<GererComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererComptesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
