import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichrListeOTmcComponent } from './affichr-liste-otmc.component';

describe('AffichrListeOTmcComponent', () => {
  let component: AffichrListeOTmcComponent;
  let fixture: ComponentFixture<AffichrListeOTmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichrListeOTmcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichrListeOTmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
