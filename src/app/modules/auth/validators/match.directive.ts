import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('password_confirmation');

  if (!password || !passwordConfirmation) {
    return null;
  }

  if (
    passwordConfirmation.errors &&
    !passwordConfirmation.errors['passwordDontMatch']
  ) {
    return null;
  }

  if (password.value !== passwordConfirmation.value) {
    passwordConfirmation.setErrors({ passwordDontMatch: true });
  } else {
    passwordConfirmation.setErrors(null);
  }

  return null;
};
