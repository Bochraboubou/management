import { TestBed } from '@angular/core/testing';

import { SecteurService } from './secteur.service';

describe('SecteurService', () => {
  let service: SecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
