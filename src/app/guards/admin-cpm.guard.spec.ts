import { TestBed } from '@angular/core/testing';

import { AdminCPMGuard } from './admin-cpm.guard';

describe('AdminCPMGuard', () => {
  let guard: AdminCPMGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminCPMGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
