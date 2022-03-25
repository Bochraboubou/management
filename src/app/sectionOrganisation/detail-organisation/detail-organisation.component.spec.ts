import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrganisationComponent } from './detail-organisation.component';

describe('DetailOrganisationComponent', () => {
  let component: DetailOrganisationComponent;
  let fixture: ComponentFixture<DetailOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
