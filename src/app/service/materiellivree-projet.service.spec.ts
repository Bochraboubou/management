import { TestBed } from '@angular/core/testing';

import { MateriellivreeProjetService } from './materiellivree-projet.service';

describe('MateriellivreeProjetService', () => {
  let service: MateriellivreeProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriellivreeProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
