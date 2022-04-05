import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMarcheesComponent } from './consulter-marchees.component';

describe('ConsulterMarcheesComponent', () => {
  let component: ConsulterMarcheesComponent;
  let fixture: ComponentFixture<ConsulterMarcheesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterMarcheesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterMarcheesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
