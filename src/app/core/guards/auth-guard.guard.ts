import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
