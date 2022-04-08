import { TestBed } from '@angular/core/testing';

import { ArticleRealiseeService } from './article-realisee.service';

describe('ArticleRealiseeService', () => {
  let service: ArticleRealiseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleRealiseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
