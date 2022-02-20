import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisePopupComponent } from './entreprise-popup.component';

describe('EntreprisePopupComponent', () => {
  let component: EntreprisePopupComponent;
  let fixture: ComponentFixture<EntreprisePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreprisePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
