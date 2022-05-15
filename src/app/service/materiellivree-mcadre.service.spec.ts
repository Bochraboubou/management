import { TestBed } from '@angular/core/testing';

import { MateriellivreeMCadreService } from './materiellivree-mcadre.service';

describe('MateriellivreeMCadreService', () => {
  let service: MateriellivreeMCadreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriellivreeMCadreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
