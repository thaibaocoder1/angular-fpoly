import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import * as UserActions from '../../../core/state/users/users.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrl: './active.component.css',
})
export class ActiveComponent implements OnInit {
  error$: Observable<any> | undefined;

  constructor(
    private store: Store<AppState>,
    private activated: ActivatedRoute,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.error$ = this.store.pipe(select((state) => state.users.error));
    this.error$?.pipe(take(1)).subscribe((err) => {
      const error = err.error;
      if (error && error.message === 'Tài khoản đã hết hạn active.') {
        this.toast.error(error.message, undefined, {
          progressBar: true,
          timeOut: 2000,
        });
      }
    });
    this.activated.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        if (id) {
          this.store.dispatch(UserActions.ActiveAccount({ id }));
          this.store
            .pipe(
              select((state) => state.users.user),
              filter((user) => !!user),
              take(1)
            )
            .subscribe((user) => {
              if (user && user.isActive) {
                this.toast.success('Active success', undefined, {
                  progressBar: true,
                  timeOut: 1000,
                });
                setTimeout(() => {
                  this.router.navigateByUrl('/auth/login');
                }, 1000);
              }
            });
        }
      });
  }
}
