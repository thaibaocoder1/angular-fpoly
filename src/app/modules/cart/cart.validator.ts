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
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiResCoupon } from '../../core/models/coupon';

@Injectable({
  providedIn: 'root',
})
export class UniqueCoupon implements AsyncValidator {
  private API_URL = environment.API_URL + 'coupons';
  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(1000),
      take(1),
      switchMap((value) => {
        return this.http.post<ApiResCoupon>(this.API_URL + '/check', {
          name: value,
        });
      }),
      map((value) => {
        const isVaid = value?.success ? null : { expireCoupon: true };
        return isVaid;
      }),
      catchError((er: Error) => {
        if (er && er.name === 'HttpErrorResponse') {
          return of({ expireCoupon: true });
        } else {
          return of({ error: true });
        }
      })
    );
  }
}
