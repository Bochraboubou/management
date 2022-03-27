import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSecteurComponent } from './nouveau-secteur.component';

describe('NouveauSecteurComponent', () => {
  let component: NouveauSecteurComponent;
  let fixture: ComponentFixture<NouveauSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauSecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
