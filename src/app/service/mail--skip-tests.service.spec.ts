import { TestBed } from '@angular/core/testing';

import { MailSkipTestsService } from './mail--skip-tests.service';

describe('MailSkipTestsService', () => {
  let service: MailSkipTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailSkipTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
