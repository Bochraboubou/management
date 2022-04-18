import { TestBed } from '@angular/core/testing';

import { ArticleUtiliseeService } from './article-utilisee.service';

describe('ArticleUtiliseeService', () => {
  let service: ArticleUtiliseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleUtiliseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
