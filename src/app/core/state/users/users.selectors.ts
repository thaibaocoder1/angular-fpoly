import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';

export const selectAuthState = (state: AppState) => state.users;
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState) => authState.auth
);
