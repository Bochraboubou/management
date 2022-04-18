import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetiersAdminComponent } from './metiers-admin.component';

describe('MetiersAdminComponent', () => {
  let component: MetiersAdminComponent;
  let fixture: ComponentFixture<MetiersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetiersAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetiersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
