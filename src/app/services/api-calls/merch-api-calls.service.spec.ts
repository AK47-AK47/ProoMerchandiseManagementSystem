import { TestBed } from '@angular/core/testing';

import { MerchApiCallsService } from './merch-api-calls.service';

describe('MerchApiCallsService', () => {
  let service: MerchApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
