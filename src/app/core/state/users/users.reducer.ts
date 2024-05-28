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
    return { ...state, loading: true };
  }),
  on(UserActions.LoginUserSuccess, (state, { auth }) => {
    return { ...state, loading: false, auth, error: '' };
  }),
  on(UserActions.LoginUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.RegUser, (state, { user }) => {
    return { ...state, loading: true };
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
  on(UserActions.GetAllUser, (state) => {
    return { ...state, loading: true };
  }),
  on(UserActions.GetAllUserSuccess, (state, { users }) => {
    return {
      ...state,
      loading: false,
      users: users.data as unknown as IUsers[],
    };
  }),
  on(UserActions.GetAllUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false };
  }),
  on(UserActions.GetUser, (state, { userId }) => {
    return { ...state, loading: true };
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
    return { ...state, loading: true };
  }),
  on(UserActions.LogoutUserSuccess, (state) => {
    return { ...state, loading: false, auth: null, user: null, users: [] };
  }),
  on(UserActions.LogoutUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.AddUser, (state, { user }) => {
    return { ...state, loading: true };
  }),
  on(UserActions.AddUserSuccess, (state, { user }) => {
    return { ...state, loading: false, user, error: '' };
  }),
  on(UserActions.AddUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(UserActions.UpdateUser, (state, { user }) => {
    return { ...state, loading: true };
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
