import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable, Subscription } from 'rxjs';
import * as UserActions from '../../../core/state/users/users.actions';
import { IUsers } from '../../../core/models/users';

type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  user$: Observable<IUsers | null> | undefined;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select((state) => state.users.user);
  }
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
          }
        }
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
