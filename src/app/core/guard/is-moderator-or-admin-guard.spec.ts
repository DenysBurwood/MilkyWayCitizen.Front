import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { isModeratorOrAdminGuard } from './is-moderator-or-admin-guard';

describe('isModeratorOrAdminGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isModeratorOrAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
