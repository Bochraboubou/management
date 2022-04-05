import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUtulisateurComponent } from './gestion-utulisateur.component';

describe('GestionUtulisateurComponent', () => {
  let component: GestionUtulisateurComponent;
  let fixture: ComponentFixture<GestionUtulisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionUtulisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUtulisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
