import { TestBed } from '@angular/core/testing';

import { TodorankingService } from './todoranking.service';

describe('TodorankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodorankingService = TestBed.get(TodorankingService);
    expect(service).toBeTruthy();
  });
});
