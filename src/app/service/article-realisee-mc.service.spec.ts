import { TestBed } from '@angular/core/testing';

import { ArticleRealiseeMCService } from './article-realisee-mc.service';

describe('ArticleRealiseeMCService', () => {
  let service: ArticleRealiseeMCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleRealiseeMCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
