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
import { ProductsService } from '../../core/services/products/products.service';

@Injectable({ providedIn: 'root' })
export class UniqueCodeValidator implements AsyncValidator {
  constructor(private productService: ProductsService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(1000),
      take(1),
      switchMap((value: string) => {
        return this.productService.checkCode(value);
      }),
      map((value) => {
        return value.success ? null : { notExist: true };
      }),
      catchError(() => {
        return of({ nonUniqueCode: true });
      })
    );
  }
}
