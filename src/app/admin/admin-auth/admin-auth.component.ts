import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../core/state/users/users.actions';
import { Observable, Subscription } from 'rxjs';
import { IUsers } from '../../core/models/users';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrl: './admin-auth.component.css',
})
export class AdminAuthComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  user$: Observable<IUsers | null> | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.store.dispatch(
              UserActions.GetUser({ userId: data?.id as string })
            );
            this.user$ = this.store.select((state) => state.users.user);
          }
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
