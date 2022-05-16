import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarsdMyCPMComponent } from './dashboarsd-my-cpm.component';

describe('DashboarsdMyCPMComponent', () => {
  let component: DashboarsdMyCPMComponent;
  let fixture: ComponentFixture<DashboarsdMyCPMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboarsdMyCPMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboarsdMyCPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
