import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoinscriptionComponent } from './doinscription.component';

describe('DoinscriptionComponent', () => {
  let component: DoinscriptionComponent;
  let fixture: ComponentFixture<DoinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoinscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
