import { TestBed } from '@angular/core/testing';

import { EntrepriseServiceService } from './entreprise-service.service';

describe('EntrepriseServiceService', () => {
  let service: EntrepriseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
