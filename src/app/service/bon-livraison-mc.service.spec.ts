import { TestBed } from '@angular/core/testing';

import { BonLivraisonMCService } from './bon-livraison-mc.service';

describe('BonLivraisonMCService', () => {
  let service: BonLivraisonMCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonLivraisonMCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
