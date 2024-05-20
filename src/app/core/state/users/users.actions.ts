import { createAction, props } from '@ngrx/store';
import { IUsers } from '../../models/users';
import { ApiResponse, IUser } from '../../adapter/users';

// [LOGIN]
export const LoginUser = createAction(
  '[User] Login User',
  props<{ user: IUser }>()
);
export const LoginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ auth: ApiResponse }>()
);
export const LoginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: string }>()
);
// [REGISTER]
export const RegUser = createAction(
  '[User] Register User',
  props<{ user: Partial<IUsers> }>()
);
export const RegUserSuccess = createAction(
  '[User] Register User Success',
  props<{ user: ApiResponse }>()
);
export const RegUserFailure = createAction(
  '[User] Register User Failure',
  props<{ error: string }>()
);
// [GET]
export const GetUser = createAction(
  '[User] Get User',
  props<{ userId: string }>()
);
export const GetUserSuccess = createAction(
  '[User] Get User Success',
  props<{ user: ApiResponse }>()
);
export const GetUserFailure = createAction(
  '[User] Get User Failure',
  props<{ error: string }>()
);
