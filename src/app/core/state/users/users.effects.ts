import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './users.actions';
import { UsersService } from '../../services/users/users.service';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoginUser),
      mergeMap((payload) =>
        this.userService.login(payload.user).pipe(
          map((auth) => UserActions.LoginUserSuccess({ auth })),
          catchError((error) => of(UserActions.LoginUserFailure({ error })))
        )
      )
    )
  );
  regUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.RegUser),
      mergeMap((payload) =>
        this.userService.register(payload.user).pipe(
          map((user) => UserActions.RegUserSuccess({ user })),
          catchError((error) => of(UserActions.RegUserFailure({ error })))
        )
      )
    )
  );
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetUser),
      mergeMap((payload) =>
        this.userService.getUser(payload.userId).pipe(
          map((user) => UserActions.GetUserSuccess({ user })),
          catchError((error) => of(UserActions.GetUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UsersService) {}
}
