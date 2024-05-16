import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UniqueEmail implements AsyncValidator {
  constructor(private authService: AuthService, private http: HttpClient) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        return this.authService.checkUniqueEmail(value);
      }),
      map((value) => {
        return value.success ? null : { notExist: true };
      }),
      catchError(() => {
        return of({ nonUniqueEmail: true });
      })
    );
  };
}
