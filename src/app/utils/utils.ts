import { catchError } from 'rxjs/operators';
import {BehaviorSubject, lastValueFrom, of, OperatorFunction, timer} from 'rxjs';
import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";

// export const catchApiError = <T>(): OperatorFunction<T, T | null> =>
//   catchError((err) => {
//     return of(null);
//   });
//
// export const catchErrorInSubject = (error$: BehaviorSubject<any>) => {
//   return catchError((err) => {
//     error$.next(err);
//     return of(null);
//   });
// };

export const wait = (due: number) => {
  return lastValueFrom(timer(due));
};

// export function whitespaceValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     if (!control.value || Validators.pattern(/^\s*\S.*$/)(control)) {
//       return { 'whitespace': true };
//     }
//     return null;
//   };
// }

export const clearSelection = ()=> {
  const selection = document.getSelection();
  if(selection) {
    selection.removeAllRanges();
  }
}
