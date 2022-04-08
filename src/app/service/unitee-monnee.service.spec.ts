import { TestBed } from '@angular/core/testing';

import { UniteeMonneeService } from './unitee-monnee.service';

describe('UniteeMonneeService', () => {
  let service: UniteeMonneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniteeMonneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
