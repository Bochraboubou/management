import { TestBed } from '@angular/core/testing';

import { OrdreDeTraveauxService } from './ordre-de-traveaux.service';

describe('OrdreDeTraveauxService', () => {
  let service: OrdreDeTraveauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreDeTraveauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
