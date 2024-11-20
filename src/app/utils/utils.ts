import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const clearSelection = (): void => {
  const selection = document.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}

export const imageUrlValidator = (): ValidatorFn => {
  const urlPattern = /^(https?:\/\/)/;

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const valid = urlPattern.test(control.value);
    return valid ? null : { invalidImageUrl: true };
  };
}
