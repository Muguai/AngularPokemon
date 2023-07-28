import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logingFormGuard } from './loging-form.guard';

describe('logingFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logingFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
