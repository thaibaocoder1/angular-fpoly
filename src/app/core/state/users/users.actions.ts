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
// [ACTIVE]
export const ActiveAccount = createAction(
  '[User] Active Account',
  props<{ id: string }>()
);
export const ActiveAccountSuccess = createAction(
  '[User] Active Account Success',
  props<{ user: IUsers }>()
);
export const ActiveAccountFailure = createAction(
  '[User] Active Account Failure',
  props<{ error: string }>()
);
// [RESET PASSWORD]
export const ResetPassword = createAction(
  '[User] Reset Password Account',
  props<{ email: string }>()
);
export const ResetPasswordSuccess = createAction(
  '[User] Reset Password Account Success',
  props<{ user: IUsers }>()
);
export const ResetPasswordFailure = createAction(
  '[User] Reset Password Account Failure',
  props<{ error: string }>()
);
// [UPDATE PASSWORD]
export const UpdatePassword = createAction(
  '[User] Update Password Account',
  props<{ values: IUsers }>()
);
export const UpdatePasswordSuccess = createAction(
  '[User] Update Password Account Success',
  props<{ user: IUsers }>()
);
export const UpdatePasswordFailure = createAction(
  '[User] Update Password Account Failure',
  props<{ error: string }>()
);
// [DISABLE]
export const DisabledUser = createAction(
  '[User] Disabled User',
  props<{ id: string }>()
);
export const DisabledUserSuccess = createAction(
  '[User] Disabled User Success',
  props<{ user: IUsers }>()
);
export const DisabledUserFailure = createAction(
  '[User] Disabled User Failure',
  props<{ error: string }>()
);
// [RESTORE]
export const RestoreAccouunt = createAction(
  '[User] Restore User',
  props<{ id: string }>()
);
export const RestoreAccouuntSuccess = createAction(
  '[User] Restore User Success',
  props<{ user: IUsers }>()
);
export const RestoreAccouuntFailure = createAction(
  '[User] Restore User Failure',
  props<{ error: string }>()
);
// [RECOVER ACCOUNT - CLIENT]
export const RecoverAccount = createAction(
  '[User] Recover Account',
  props<{ email: string }>()
);
export const RecoverAccountSuccess = createAction(
  '[User] Recover Account Success',
  props<{ user: IUsers }>()
);
export const RecoverAccountFailure = createAction(
  '[User] Recover Account Failure',
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
// [GET ALL TRASH]
export const GetAllUserTrash = createAction('[User] Get All User Trash');
export const GetAllUserTrashSuccess = createAction(
  '[User] Get All User Trash Success',
  props<{ users: IUsers[] }>()
);
export const GetAllUserTrashFailure = createAction(
  '[User] Get All User Trash Failure',
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
// [UPDATE]
export const UpdateUser = createAction(
  '[User] Update User',
  props<{ user: IUsers }>()
);
export const UpdateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUsers }>()
);
export const UpdateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);
// RESET
export const ResetState = createAction('[User] Reset All');
