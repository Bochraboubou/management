import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCattachementComponent } from './mcattachement.component';

describe('MCattachementComponent', () => {
  let component: MCattachementComponent;
  let fixture: ComponentFixture<MCattachementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCattachementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCattachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
