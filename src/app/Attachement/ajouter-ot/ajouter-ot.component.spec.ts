import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOTComponent } from './ajouter-ot.component';

describe('AjouterOTComponent', () => {
  let component: AjouterOTComponent;
  let fixture: ComponentFixture<AjouterOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
