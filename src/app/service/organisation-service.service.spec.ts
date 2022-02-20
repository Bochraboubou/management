import { TestBed } from '@angular/core/testing';

import { OrganisationServiceService } from './organisation-service.service';

describe('OrganisationServiceService', () => {
  let service: OrganisationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
