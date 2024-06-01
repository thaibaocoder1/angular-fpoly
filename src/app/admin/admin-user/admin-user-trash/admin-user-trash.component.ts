import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppState } from '../../../app.state';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IUsers } from '../../../core/models/users';
import * as UserActions from '../../../core/state/users/users.actions';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user-trash',
  templateUrl: './admin-user-trash.component.html',
  styleUrl: './admin-user-trash.component.css',
})
export class AdminUserTrashComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  users$: Observable<IUsers[]> | undefined;
  @ViewChild('restoreModal', { static: true }) restoreModal:
    | ModalComponent
    | undefined;
  @ViewChild('deleteModal', { static: true }) deleteModal:
    | ModalComponent
    | undefined;
  constructor(
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.getAll();
    this.users$ = this.store.select((state) => state.users.users);
  }
  handleRestoreUser(id: string) {
    if (id && this.restoreModal) {
      this.restoreModal.refID = id;
    }
  }
  handleDestroyUser(id: string) {
    if (id && this.deleteModal) {
      this.deleteModal.refID = id;
    }
  }
  ngAfterViewInit(): void {
    if (this.restoreModal) {
      this.restoreModal.confirm
        .pipe(
          select((id) => id),
          take(1)
        )
        .subscribe((id: string) => {
          if (id) {
            this.store.dispatch(UserActions.RestoreAccouunt({ id }));
            this.sideAction();
          }
        });
    }
    if (this.deleteModal) {
      this.deleteModal.confirm
        .pipe(
          select((id) => id),
          take(1)
        )
        .subscribe((id: string) => {
          if (id) {
            this.store.dispatch(UserActions.DestroyAccount({ id }));
            this.sideAction();
          }
        });
    }
  }
  sideAction() {
    this.store;
    this.store
      .pipe(
        select((state) => state.users.loading),
        distinctUntilChanged(),
        tap(() => {
          this.spinner.show();
        }),
        filter((loading) => !loading),
        tap(() => {
          this.spinner.hide();
        }),
        switchMap(() => {
          return this.store.pipe(select((state) => state.users.user));
        }),
        take(1)
      )
      .subscribe((user) => {
        if (user) {
          this.toast.success('Action success!', undefined, {
            progressBar: true,
            timeOut: 1000,
          });
          this.getAll();
        }
      });
  }
  getAll() {
    this.store.dispatch(UserActions.GetAllUserTrash());
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
