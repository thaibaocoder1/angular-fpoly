import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from '../../app.state';
import { selectIsAuthenticated } from '../state/users/users.selectors';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select(selectIsAuthenticated).pipe(
    map((res) => {
      if (res && res?.success) {
        return true;
      } else {
        router.navigateByUrl('/auth/login');
        return false;
      }
    })
  );
};
