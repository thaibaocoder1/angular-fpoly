import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from '../../adapter/users';
import { IUsers } from '../../models/users';

export const initialState: UsersState = {
  loading: false,
  auth: null,
  user: null,
  users: [],
  error: '',
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.LoginUser, (state, { user }) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.LoginUserSuccess, (state, { auth }) => {
    return { ...state, loading: false, auth, error: '' };
  }),
  on(UserActions.LoginUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.RegUser, (state, { user }) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.RegUserSuccess, (state, { user }) => {
    let values: IUsers;
    if (user.success) {
      if ('data' in user) {
        const { data } = user;
        if ('password' in data) {
          values = data;
        }
      }
    }
    return { ...state, loading: false, error: '', user: values! };
  }),
  on(UserActions.RegUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error: error };
  }),
  on(UserActions.ActiveAccount, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.ActiveAccountSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
      error: '',
    };
  }),
  on(UserActions.ActiveAccountFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(UserActions.ResetPassword, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.ResetPasswordSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
      error: '',
    };
  }),
  on(UserActions.ResetPasswordFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(UserActions.RestoreAccouunt, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.RestoreAccouuntSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
      error: '',
    };
  }),
  on(UserActions.RestoreAccouuntFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.RecoverAccount, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.RecoverAccountSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
      error: '',
    };
  }),
  on(UserActions.RecoverAccountFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.UpdatePassword, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.UpdatePasswordSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
      error: '',
    };
  }),
  on(UserActions.UpdatePasswordFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.GetAllUser, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.GetAllUserSuccess, (state, { users }) => {
    return {
      ...state,
      loading: false,
      users: users.data as unknown as IUsers[],
      error: '',
    };
  }),
  on(UserActions.GetAllUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.GetAllUserTrash, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.GetAllUserTrashSuccess, (state, { users }) => {
    return {
      ...state,
      loading: false,
      users,
      error: '',
    };
  }),
  on(UserActions.GetAllUserTrashFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.GetUser, (state, { userId }) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.GetUserSuccess, (state, { user }) => {
    const { data } = user;
    return { ...state, loading: false, user: data as IUsers, error: '' };
  }),
  on(UserActions.GetUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.LogoutUser, (state) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.LogoutUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
      auth: null,
      user: null,
      users: [],
      error: '',
    };
  }),
  on(UserActions.LogoutUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.AddUser, (state, { user }) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.AddUserSuccess, (state, { user }) => {
    return { ...state, loading: false, user, error: '' };
  }),
  on(UserActions.AddUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.UpdateUser, (state, { user }) => {
    return { ...state, loading: true, error: '' };
  }),
  on(UserActions.UpdateUserSuccess, (state, { user }) => {
    return { ...state, loading: false, user, error: '' };
  }),
  on(UserActions.UpdateUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.ResetState, (state) => {
    return {
      ...state,
      loading: false,
      auth: null,
      user: null,
      admin: null,
      users: [],
      error: '',
    };
  })
);
