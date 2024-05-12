import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ITodos } from '../../../core/models/todo';
import * as TodoActions from '../../../core/state/todo/todo.actions';
import { AppState } from '../../../app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-product-latest',
  templateUrl: './home-product-latest.component.html',
  styleUrl: './home-product-latest.component.css',
})
export class HomeProductLatestComponent implements OnInit {
  todos$: Observable<ITodos[]>;
  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.pipe(select('todos'));
  }
  ngOnInit() {
    this.loadTodos();
  }
  loadTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
