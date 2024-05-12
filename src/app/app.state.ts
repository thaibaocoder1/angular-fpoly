import { ITodos } from './core/models/todo';

export interface AppState {
  readonly todos: ITodos[];
}
