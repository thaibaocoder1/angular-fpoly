import { createAction, props } from '@ngrx/store';
import { IUsers } from '../../models/users';

interface IUser {
  email: string;
  password: string;
}
type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
// [LOGIN]
export const LoginUser = createAction(
  '[User] Login User',
  props<{ user: IUser }>()
);
export const LoginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: ApiResponse }>()
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
