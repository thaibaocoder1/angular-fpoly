import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectIsAuthenticated } from '../state/users/users.selectors';
import { map } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select(selectIsAuthenticated).pipe(
    map((res) => {
      if (res && res?.success) {
        const { data } = res;
        if (data?.role === 'User') {
          router.navigateByUrl('/auth/forbidden');
          return false;
        }
        return true;
      } else {
        router.navigateByUrl('/auth/permission');
        return false;
      }
    })
  );
};
