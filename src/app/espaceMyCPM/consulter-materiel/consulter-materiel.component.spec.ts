import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMaterielComponent } from './consulter-materiel.component';

describe('ConsulterMaterielComponent', () => {
  let component: ConsulterMaterielComponent;
  let fixture: ComponentFixture<ConsulterMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
