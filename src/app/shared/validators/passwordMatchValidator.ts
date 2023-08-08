import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('newPassword')?.value;
    const confirmedPassword = control.get('newConfirmedPassword')?.value;

    // Vérifie si les mots de passe correspondent
    if (password !== confirmedPassword) {
      return { 'passwordMismatch': true };
    }

    return null; // Les mots de passe correspondent
  };
}
