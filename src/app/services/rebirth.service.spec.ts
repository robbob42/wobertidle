import { TestBed } from '@angular/core/testing';

import { RebirthService } from './rebirth.service';

describe('RebirthService', () => {
  let service: RebirthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RebirthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
