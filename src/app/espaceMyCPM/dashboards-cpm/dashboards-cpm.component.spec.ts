import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsCPMComponent } from './dashboards-cpm.component';

describe('DashboardsCPMComponent', () => {
  let component: DashboardsCPMComponent;
  let fixture: ComponentFixture<DashboardsCPMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsCPMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsCPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
