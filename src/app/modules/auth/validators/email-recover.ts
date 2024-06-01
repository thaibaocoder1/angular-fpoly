import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailRecover implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(1000),
      take(1),
      switchMap((value) => {
        return this.authService.checkEmailRecover(value);
      }),
      map((value) => {
        return value.success ? null : { notExist: true };
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of({ notFound: true });
        }
        return of(null);
      })
    );
  };
}
