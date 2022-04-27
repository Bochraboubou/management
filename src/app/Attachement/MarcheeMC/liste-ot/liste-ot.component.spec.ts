import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOTComponent } from './liste-ot.component';

describe('ListeOTComponent', () => {
  let component: ListeOTComponent;
  let fixture: ComponentFixture<ListeOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
