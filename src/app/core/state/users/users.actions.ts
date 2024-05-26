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
// [GET ONE]
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
// [GET ALL]
export const GetAllUser = createAction('[User] Get All User');
export const GetAllUserSuccess = createAction(
  '[User] Get All User Success',
  props<{ users: ApiResponse }>()
);
export const GetAllUserFailure = createAction(
  '[User] Get All User Failure',
  props<{ error: string }>()
);
// [LOGOUT]
export const LogoutUser = createAction(
  '[User] Logout User',
  props<{ userId: string }>()
);
export const LogoutUserSuccess = createAction('[User] Logout User Success');
export const LogoutUserFailure = createAction(
  '[User] Logout User Failure',
  props<{ error: string }>()
);
// [ADD]
export const AddUser = createAction(
  '[User] Add User',
  props<{ user: IUsers }>()
);
export const AddUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: IUsers }>()
);
export const AddUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: string }>()
);
// RESET
export const ResetState = createAction('[User] Reset All');
