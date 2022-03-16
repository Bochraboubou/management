import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDemandeComponent } from './one-demande.component';

describe('OneDemandeComponent', () => {
  let component: OneDemandeComponent;
  let fixture: ComponentFixture<OneDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
