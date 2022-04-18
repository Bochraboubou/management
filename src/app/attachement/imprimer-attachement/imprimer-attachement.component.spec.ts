import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerAttachementComponent } from './imprimer-attachement.component';

describe('ImprimerAttachementComponent', () => {
  let component: ImprimerAttachementComponent;
  let fixture: ComponentFixture<ImprimerAttachementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerAttachementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerAttachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
