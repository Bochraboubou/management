import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesUtulisateurComponent } from './listes-utulisateur.component';

describe('ListesUtulisateurComponent', () => {
  let component: ListesUtulisateurComponent;
  let fixture: ComponentFixture<ListesUtulisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesUtulisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesUtulisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
