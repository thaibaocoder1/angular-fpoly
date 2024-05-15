import { createReducer, on } from '@ngrx/store';
import { IUsers } from '../../models/users';
import * as CatalogActions from './users.actions';

export const initialState: IUsers[] = [];

// export const UserReducer = createReducer(
//   initialState,
//   on(CatalogActions.addUser, (state) => state),
//   on(CatalogActions.addUserSuccess, (state, { catalogs }) => catalogs),
//   on(CatalogActions.addUserFailure, (state, { error }) => {
//     console.error(error);
//     return state;
//   })
// );
