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
  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetAllUser),
      mergeMap(() =>
        this.userService.getAllUser().pipe(
          map((users) => UserActions.GetAllUserSuccess({ users })),
          catchError((error) => of(UserActions.GetAllUserFailure({ error })))
        )
      )
    )
  );
  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LogoutUser),
      mergeMap((payload) =>
        this.userService.logout(payload.userId).pipe(
          map(() => UserActions.LogoutUserSuccess()),
          catchError((error) => of(UserActions.LogoutUserFailure({ error })))
        )
      )
    )
  );
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AddUser),
      mergeMap((payload) =>
        this.userService.addUser(payload.user).pipe(
          map((user) => UserActions.AddUserSuccess({ user })),
          catchError((error) => of(UserActions.AddUserFailure({ error })))
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      mergeMap((payload) =>
        this.userService.updateUser(payload.user).pipe(
          map((user) => UserActions.UpdateUserSuccess({ user })),
          catchError((error) => of(UserActions.UpdateUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UsersService) {}
}
