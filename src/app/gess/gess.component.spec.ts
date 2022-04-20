import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GessComponent } from './gess.component';

describe('GessComponent', () => {
  let component: GessComponent;
  let fixture: ComponentFixture<GessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
