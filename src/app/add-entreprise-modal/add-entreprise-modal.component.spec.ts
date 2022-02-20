import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntrepriseModalComponent } from './add-entreprise-modal.component';

describe('AddEntrepriseModalComponent', () => {
  let component: AddEntrepriseModalComponent;
  let fixture: ComponentFixture<AddEntrepriseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntrepriseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrepriseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
