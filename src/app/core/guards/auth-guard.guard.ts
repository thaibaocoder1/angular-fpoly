import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (auth.isLoggin()) {
    console.log('123');
  } else {
    console.log(456);
  }
  return true;
};
