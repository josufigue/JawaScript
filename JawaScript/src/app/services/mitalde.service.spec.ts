import { TestBed } from '@angular/core/testing';

import { MitaldeService } from './mitalde.service';

describe('MitaldeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MitaldeService = TestBed.get(MitaldeService);
    expect(service).toBeTruthy();
  });
});
