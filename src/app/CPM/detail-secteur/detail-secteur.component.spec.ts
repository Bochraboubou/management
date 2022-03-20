import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSecteurComponent } from './detail-secteur.component';

describe('DetailSecteurComponent', () => {
  let component: DetailSecteurComponent;
  let fixture: ComponentFixture<DetailSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
