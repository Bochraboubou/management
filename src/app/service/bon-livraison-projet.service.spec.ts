import { TestBed } from '@angular/core/testing';

import { BonLivraisonProjetService } from './bon-livraison-projet.service';

describe('BonLivraisonProjetService', () => {
  let service: BonLivraisonProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonLivraisonProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
