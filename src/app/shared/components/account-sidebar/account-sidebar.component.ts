import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { AppState } from '../../../app.state';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../../core/state/users/users.actions';
import { Observable, Subscription } from 'rxjs';
import { IUsers } from '../../../core/models/users';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css',
})
export class AccountSidebarComponent implements OnInit {
  user$: Observable<IUsers | null> | undefined;
  subscription: Subscription | undefined;
  userId: string | undefined;
  constructor(
    private userService: UsersService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.userId = data.id;
          }
        }
      });
  }
  handleLogout() {
    this.logout();
    this.userService.userSignals.set(null);
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
    this.store.dispatch(
      UserActions.LogoutUser({ userId: this.userId as string })
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
