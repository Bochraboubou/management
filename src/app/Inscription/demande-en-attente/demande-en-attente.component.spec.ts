import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEnAttenteComponent } from './demande-en-attente.component';

describe('DemandeEnAttenteComponent', () => {
  let component: DemandeEnAttenteComponent;
  let fixture: ComponentFixture<DemandeEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEnAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
