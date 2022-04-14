import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBonDeCommandeComponent } from './detail-bon-de-commande.component';

describe('DetailBonDeCommandeComponent', () => {
  let component: DetailBonDeCommandeComponent;
  let fixture: ComponentFixture<DetailBonDeCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBonDeCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBonDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
