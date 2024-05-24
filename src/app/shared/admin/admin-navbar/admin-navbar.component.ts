import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, switchMap, take } from 'rxjs';
import { AppState } from '../../../app.state';
import * as UserActions from '../../../core/state/users/users.actions';
import { UsersService } from '../../../core/services/users/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<AppState>,
    private userService: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const modal = document.getElementById('logoutModal') as HTMLElement;
    const modalConfirm = modal.querySelector(
      'button.btn.btn-primary'
    ) as HTMLButtonElement;
    fromEvent(modalConfirm, 'click')
      .pipe(
        switchMap(() => this.store.select((state) => state.users.auth)),
        take(1)
      )
      .subscribe((res) => {
        if (res && res.success) {
          const { data } = res;
          if ('accessToken' in data) {
            this.store.dispatch(UserActions.LogoutUser({ userId: data.id }));
            this.userService.userSignals.set(null);
            localStorage.removeItem('access_token');
            this.router.navigateByUrl('/auth/login');
          }
        }
      });
  }
}
