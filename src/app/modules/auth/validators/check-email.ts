import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckEmail implements AsyncValidator {
  constructor(private auth: AuthService) {}
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        return this.auth.checkExistEmail(value);
      }),
      map((value) => {
        return value?.success ? null : { exist: true };
      }),
      catchError(() => {
        return of({ existEmail: true });
      })
    );
  }
}
