import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviterEntrepriseComponent } from './inviter-entreprise.component';

describe('InviterEntrepriseComponent', () => {
  let component: InviterEntrepriseComponent;
  let fixture: ComponentFixture<InviterEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviterEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviterEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
