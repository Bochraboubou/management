import { TestBed } from '@angular/core/testing';

import { BondeCommandeService } from './bonde-commande.service';

describe('BondeCommandeService', () => {
  let service: BondeCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondeCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
