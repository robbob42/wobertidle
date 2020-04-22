import { TestBed } from '@angular/core/testing';

import { ImprovementService } from './improvement.service';

describe('ImprovementService', () => {
  let service: ImprovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
