import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMaterielsMCComponent } from './consulter-materiels-mc.component';

describe('ConsulterMaterielsMCComponent', () => {
  let component: ConsulterMaterielsMCComponent;
  let fixture: ComponentFixture<ConsulterMaterielsMCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterMaterielsMCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterMaterielsMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
