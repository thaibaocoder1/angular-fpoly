import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, Subscription } from 'rxjs';
import { IUsers } from '../../core/models/users';
import * as UserActions from '../../core/state/users/users.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  user$: Observable<IUsers | null> | undefined;
  sub: Subscription | undefined;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select((state) => state.users.user);
  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.sub = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.store.dispatch(
              UserActions.GetUser({ userId: data?.id as string })
            );
          }
        }
      });
  }
}
