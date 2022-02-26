import { TestBed } from '@angular/core/testing';

import { MarcheeService } from './marchee.service';

describe('MarcheeService', () => {
  let service: MarcheeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcheeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
