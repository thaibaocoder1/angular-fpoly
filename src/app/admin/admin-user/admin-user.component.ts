import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUsers } from '../../core/models/users';
import * as UserActions from '../../core/state/users/users.actions';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
})
export class AdminUserComponent implements OnInit {
  users$: Observable<IUsers[] | null> | undefined;
  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select((state) => state.users.users);
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.store.dispatch(UserActions.GetAllUser());
  }
}
