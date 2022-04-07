import { TestBed } from '@angular/core/testing';

import { ArticleRService } from './article-r.service';

describe('ArticleRService', () => {
  let service: ArticleRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
