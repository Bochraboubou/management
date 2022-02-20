import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOrganisationComponent } from './ajouter-organisation.component';

describe('AjouterOrganisationComponent', () => {
  let component: AjouterOrganisationComponent;
  let fixture: ComponentFixture<AjouterOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
