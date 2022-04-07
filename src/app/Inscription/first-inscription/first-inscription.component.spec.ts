import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstInscriptionComponent } from './first-inscription.component';

describe('FirstInscriptionComponent', () => {
  let component: FirstInscriptionComponent;
  let fixture: ComponentFixture<FirstInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
