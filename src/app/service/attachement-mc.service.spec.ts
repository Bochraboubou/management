import { TestBed } from '@angular/core/testing';

import { AttachementMCService } from './attachement-mc.service';

describe('AttachementMCService', () => {
  let service: AttachementMCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachementMCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
