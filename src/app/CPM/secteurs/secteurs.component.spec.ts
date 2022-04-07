import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteursComponent } from './secteurs.component';

describe('SecteursComponent', () => {
  let component: SecteursComponent;
  let fixture: ComponentFixture<SecteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
