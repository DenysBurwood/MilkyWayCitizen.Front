import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { isNotConnectedGuard } from './is-not-connected-guard';

describe('isNotConnectedGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
