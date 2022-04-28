import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterOTComponent } from './consulter-ot.component';

describe('ConsulterOTComponent', () => {
  let component: ConsulterOTComponent;
  let fixture: ComponentFixture<ConsulterOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
