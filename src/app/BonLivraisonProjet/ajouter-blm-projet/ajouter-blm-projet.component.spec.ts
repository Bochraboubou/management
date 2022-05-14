import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBlmProjetComponent } from './ajouter-blm-projet.component';

describe('AjouterBlmProjetComponent', () => {
  let component: AjouterBlmProjetComponent;
  let fixture: ComponentFixture<AjouterBlmProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBlmProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterBlmProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
