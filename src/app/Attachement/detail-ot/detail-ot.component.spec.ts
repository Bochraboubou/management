import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOTComponent } from './detail-ot.component';

describe('DetailOTComponent', () => {
  let component: DetailOTComponent;
  let fixture: ComponentFixture<DetailOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
