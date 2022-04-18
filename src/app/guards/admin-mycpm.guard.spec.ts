import { TestBed } from '@angular/core/testing';

import { AdminMYCPMGuard } from './admin-mycpm.guard';

describe('AdminMYCPMGuard', () => {
  let guard: AdminMYCPMGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminMYCPMGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
