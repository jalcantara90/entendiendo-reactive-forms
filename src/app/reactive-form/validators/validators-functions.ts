import { MockService } from '../services/mock.service';
import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  FormArray,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const confirmedPassword = (): ValidatorFn => {
  return (group: FormGroup): ValidationErrors => {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return { notSamePassword: 'Password and confirm password has to be the same.' };
    }
    return null;
  };
};

export const allFormControlsAreValid = (): ValidatorFn => {
  return (formArray: FormArray): ValidationErrors => {
    if (formArray.controls.every( control => control.valid ) ) {
      return null;
    }

    return { notValidPhone: 'Some phone is not valid' };
  };
};

export const emailRegisteredWithoutDependencies = (service: MockService): AsyncValidatorFn => {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return service.getMockData().pipe(
      map( res => ( res.some( resItem => resItem.email === control.value) ) ? {emailRegisteredWithoutDependency: true} : null )
    );
  };
};
