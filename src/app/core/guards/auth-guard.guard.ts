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
        console.log(data);
        return true;
      } else {
        console.log(132);
        router.navigateByUrl('/auth/test');
        return false;
      }
    })
  );
};
