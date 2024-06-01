import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, map, take } from 'rxjs';
import * as UserActions from '../../../core/state/users/users.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  message: string = 'Tài khoản đã được khôi phục';
  error$: Observable<any> | undefined;
  constructor(
    private store: Store<AppState>,
    private activated: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.error$ = this.store.pipe(select((state) => state.users.error));
    this.error$?.pipe(take(1)).subscribe((err) => {
      if (err && err === 'Thời gian tối thiểu khôi phục là 1 ngày!') {
        this.message = err;
      }
    });
    this.subscription = this.activated.queryParamMap
      .pipe(map((params) => params))
      .subscribe((params) => {
        const userID = params.get('id');
        const hashCode = params.get('hash');
        if (userID && hashCode) {
          this.store.dispatch(
            UserActions.ConfirmRecover({ id: userID, hash: hashCode })
          );
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
