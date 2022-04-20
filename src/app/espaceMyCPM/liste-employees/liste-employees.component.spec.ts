import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmployeesComponent } from './liste-employees.component';

describe('ListeEmployeesComponent', () => {
  let component: ListeEmployeesComponent;
  let fixture: ComponentFixture<ListeEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
