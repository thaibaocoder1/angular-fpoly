import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  take,
  map,
} from 'rxjs';
import { ApiResCoupon } from '../../core/models/coupon';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckCouponUnique implements AsyncValidator {
  private API_URL = environment.API_URL + 'coupons';
  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      take(1),
      switchMap((value: string) => {
        return this.http.post<ApiResCoupon>(`${this.API_URL}/exist`, {
          value,
        });
      }),
      map((value) => {
        return value.success ? null : { notExist: true };
      }),
      catchError((ere) => {
        console.log(ere);
        return of({ nonUniqueCoupon: true });
      })
    );
  }
}
