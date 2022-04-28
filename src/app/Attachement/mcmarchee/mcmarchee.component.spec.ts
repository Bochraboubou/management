import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMarcheeComponent } from './mcmarchee.component';

describe('MCMarcheeComponent', () => {
  let component: MCMarcheeComponent;
  let fixture: ComponentFixture<MCMarcheeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCMarcheeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCMarcheeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
