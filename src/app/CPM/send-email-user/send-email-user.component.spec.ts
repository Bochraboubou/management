import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailUserComponent } from './send-email-user.component';

describe('SendEmailUserComponent', () => {
  let component: SendEmailUserComponent;
  let fixture: ComponentFixture<SendEmailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
