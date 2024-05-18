import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from '../../adapter/users';

export const initialState: UsersState = {
  loading: false,
  user: null,
  users: [],
  error: '',
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.LoginUser, (state, { user }) => {
    return { ...state, loading: true };
  }),
  on(UserActions.LoginUserSuccess, (state, { user }) => {
    return { ...state, loading: false, user };
  }),
  on(UserActions.LoginUserFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
  on(UserActions.RegUser, (state, { user }) => {
    console.log(user);
    return { ...state };
  })
);
