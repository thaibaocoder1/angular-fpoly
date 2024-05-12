import { createReducer, on } from '@ngrx/store';
import { ITodos } from '../../models/todo';
import * as TodoActions from './todo.actions';

export const initialState: ITodos[] = [];

export const TodoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => state),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => todos),
  on(TodoActions.loadTodosFailure, (state, { error }) => {
    console.error(error);
    return state;
  })
);
