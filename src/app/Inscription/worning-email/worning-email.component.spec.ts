import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorningEmailComponent } from './worning-email.component';

describe('WorningEmailComponent', () => {
  let component: WorningEmailComponent;
  let fixture: ComponentFixture<WorningEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorningEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorningEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
