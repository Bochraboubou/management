import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterattachementComponent } from './ajouterattachement.component';

describe('AjouterattachementComponent', () => {
  let component: AjouterattachementComponent;
  let fixture: ComponentFixture<AjouterattachementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterattachementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterattachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
