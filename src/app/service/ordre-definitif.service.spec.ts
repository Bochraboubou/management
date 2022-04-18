import { TestBed } from '@angular/core/testing';

import { OrdreDefinitifService } from './ordre-definitif.service';

describe('OrdreDefinitifService', () => {
  let service: OrdreDefinitifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreDefinitifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
