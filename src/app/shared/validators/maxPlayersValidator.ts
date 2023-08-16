import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxPlayersValidator(minPlayersControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Récupération de la valeur de minPlayers à partir du parent du contrôle
    const minPlayersValue = control.parent?.get(minPlayersControlName)?.value;
    // Récupération de la valeur de maxPlayers à partir du contrôle actuel
    const maxPlayersValue = control.value;

    // Vérification si maxPlayers est inférieur à minPlayers
    if (minPlayersValue !== null && maxPlayersValue !== null && maxPlayersValue < minPlayersValue) {
      return { maxPlayersLessThanMinPlayers: true };
    }

    return null;
  };
}
