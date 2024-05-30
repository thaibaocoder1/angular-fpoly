import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ICoupons } from '../../core/models/coupon';
import * as CouponActions from '../../core/state/coupon/coupon.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckCouponUnique } from '../validators/check-coupon';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DateFormatPipe } from '../../shared/pipes/date.pipe';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrl: './admin-coupon.component.css',
})
export class AdminCouponComponent implements OnInit, AfterViewInit {
  coupons$: Observable<ICoupons[] | null> | undefined;
  formCoupon = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(/^SALE#+[0-9]\b/g)],
      [this.unique.validate.bind(this.unique)],
    ],
    value: ['', [Validators.required]],
    expireIns: ['', [Validators.required]],
  });
  formCouponEdit = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^SALE#+[0-9]\b/g)]],
    value: ['', [Validators.required]],
    expireIns: ['', [Validators.required]],
  });
  @ViewChild('removeCoupon', { static: true }) removeCoupon:
    | ModalComponent
    | undefined;
  formSubmitSubject$ = new Subject<boolean>();
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private unique: CheckCouponUnique,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private date: DateFormatPipe
  ) {}
  ngOnInit(): void {
    this.getAll();
    this.coupons$ = this.store.select((state) => state.coupons.coupons);
    this.formSubmitSubject$
      .pipe(
        tap(() => this.formCoupon.markAsDirty()),
        switchMap(() =>
          this.formCoupon.statusChanges.pipe(
            startWith(this.formCoupon.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitForm());
  }
  handleEditCoupon(id: string) {
    if (id) {
      this.store.dispatch(CouponActions.GetOneCounpon({ id }));
      this.store
        .pipe(
          select((state) => state.coupons.loading),
          distinctUntilChanged(),
          tap(() => {
            this.spinner.show();
          }),
          filter((loading) => !loading),
          tap(() => {
            this.spinner.hide();
          }),
          switchMap(() => {
            return this.store.pipe(select((state) => state.coupons.coupon));
          }),
          take(1)
        )
        .subscribe((res) => {
          if (res) {
            const timeExpires = this.date.transform(res.expireIns);
            this.formCouponEdit.patchValue({
              name: res.name,
              value: res.value as unknown as string,
              expireIns: timeExpires,
            });
          }
        });
    }
  }
  handleRemoveCoupon(id: string) {
    if (id && this.removeCoupon) {
      this.removeCoupon.refID = id;
    }
  }
  submitForm() {
    const values = this.formCoupon.getRawValue() as unknown as ICoupons;
    if (values) {
      const timestamp = Date.parse(values.expireIns as unknown as string);
      values.expireIns = timestamp;
      this.store.dispatch(CouponActions.AddCoupon({ values }));
      this.store
        .pipe(
          select((state) => state.coupons.loading),
          distinctUntilChanged(),
          tap(() => this.spinner.show()),
          filter((loading) => !loading),
          tap(() => {
            this.spinner.hide();
          }),
          switchMap(() => {
            return this.store.pipe(select((state) => state.coupons.coupon));
          }),
          take(1)
        )
        .subscribe((data) => {
          if (data) {
            this.toast.success('Action success', undefined, {
              progressBar: true,
              timeOut: 1000,
            });
            this.formCoupon.reset();
            this.getAll();
          }
        });
    }
  }
  submitFormEdit() {
    const values = this.formCouponEdit.getRawValue() as unknown as ICoupons;
    this.store
      .pipe(
        select((state) => state.coupons.coupon),
        filter((coupon) => !!coupon),
        take(1)
      )
      .subscribe((res) => {
        if (res) {
          values._id = res._id;
          const timestamp = Date.parse(values.expireIns as unknown as string);
          values.expireIns = timestamp;
        }
      });
    if (values) {
      this.store.dispatch(CouponActions.UpdateCoupon({ values }));
      this.store
        .pipe(
          select((state) => state.coupons.loading),
          filter((loading) => !loading),
          switchMap(() => this.store.select((state) => state.coupons.coupon)),
          take(1)
        )
        .subscribe((res) => {
          if (res) {
            this.toast.success('Action success', undefined, {
              timeOut: 1000,
              progressBar: true,
            });
            this.formCouponEdit.reset();
            this.getAll();
          }
        });
    }
  }
  getAll() {
    this.store.dispatch(CouponActions.GetCounpon());
  }
  remove(id: string) {
    this.store.dispatch(CouponActions.RemoveCoupon({ id }));
    this.store
      .pipe(
        select((state) => state.coupons.loading),
        distinctUntilChanged(),
        tap(() => this.spinner.show()),
        filter((loading) => !loading),
        tap(() => {
          this.spinner.hide();
        }),
        take(1)
      )
      .subscribe((loading) => {
        if (!loading) {
          this.toast.success('Action success', undefined, {
            progressBar: true,
            timeOut: 1000,
          });
          this.getAll();
        }
      });
  }
  ngAfterViewInit(): void {
    if (this.removeCoupon) {
      this.removeCoupon.confirm.subscribe((id: string) => {
        this.remove(id);
      });
    }
  }
}
