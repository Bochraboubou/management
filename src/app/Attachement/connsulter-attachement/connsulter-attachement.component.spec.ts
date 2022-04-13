import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnsulterAttachementComponent } from './connsulter-attachement.component';

describe('ConnsulterAttachementComponent', () => {
  let component: ConnsulterAttachementComponent;
  let fixture: ComponentFixture<ConnsulterAttachementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnsulterAttachementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnsulterAttachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
