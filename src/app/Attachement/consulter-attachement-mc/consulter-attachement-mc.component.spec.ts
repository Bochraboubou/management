import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterAttachementMCComponent } from './consulter-attachement-mc.component';

describe('ConsulterAttachementMCComponent', () => {
  let component: ConsulterAttachementMCComponent;
  let fixture: ComponentFixture<ConsulterAttachementMCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterAttachementMCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterAttachementMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
