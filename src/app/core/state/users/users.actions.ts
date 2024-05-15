import { createAction, props } from '@ngrx/store';
import { IUsers } from '../../models/users';

export const addUser = createAction(
  '[User] Add User',
  props<{ user: IUsers }>()
);
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: IUsers }>()
);
export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: string }>()
);
