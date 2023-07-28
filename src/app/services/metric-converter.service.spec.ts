import { TestBed } from '@angular/core/testing';

import { MetricConverterService } from './metric-converter.service';

describe('MetricConverterService', () => {
  let service: MetricConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
