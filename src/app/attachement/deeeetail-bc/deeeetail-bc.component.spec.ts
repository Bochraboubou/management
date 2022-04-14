import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeeetailBCComponent } from './deeeetail-bc.component';

describe('DeeeetailBCComponent', () => {
  let component: DeeeetailBCComponent;
  let fixture: ComponentFixture<DeeeetailBCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeeeetailBCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeeetailBCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
