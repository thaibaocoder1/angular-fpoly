import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from '../../adapter/users';

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
    return { ...state, loading: false, auth };
  }),
  on(UserActions.LoginUserFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
  on(UserActions.RegUser, (state, { user }) => {
    return { ...state, loading: true };
  }),
  on(UserActions.RegUserSuccess, (state, { user }) => {
    return { ...state, loading: false };
  }),
  on(UserActions.RegUserFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error: error };
  })
);
