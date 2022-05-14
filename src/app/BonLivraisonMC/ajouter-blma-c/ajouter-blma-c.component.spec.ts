import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBLmaCComponent } from './ajouter-blma-c.component';

describe('AjouterBLmaCComponent', () => {
  let component: AjouterBLmaCComponent;
  let fixture: ComponentFixture<AjouterBLmaCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBLmaCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterBLmaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
