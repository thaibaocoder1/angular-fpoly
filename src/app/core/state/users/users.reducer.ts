import { createReducer, on } from '@ngrx/store';
import { IUsers } from '../../models/users';
import * as UserActions from './users.actions';

export const initialState: IUsers[] = [];

export const UserReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state) => state),
  on(UserActions.addUserSuccess, (state, { user }) => [...state, user]),
  on(UserActions.addUserFailure, (state, { error }) => {
    console.error(error);
    return state;
  })
);
