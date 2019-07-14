import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MockService } from '../../services/mock.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private mockService: MockService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(\w*gmail)/)
      ], [
        this.emailRegistered().bind(this),
        this.emailRegisteredWithoutDependencies(this.mockService)
      ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(4) ]),
      confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(4) ]),
      from: new FormControl(),
      to: new FormControl(),
      hasPhones: new FormControl(),
      phones: new FormArray([
        new FormControl(null, Validators.required )
      ], { validators: this.allFormControlsAreValid() }),
      options: new FormControl(null, [ Validators.required]),
      terms: new FormControl(null, [ Validators.requiredTrue ])
    }, { validators: this.confirmedPassword() });
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    if (this.phones.controls.length < 3) {
      this.phones.insert(
        this.phones.controls.length,
        new FormControl(null, Validators.required)
      );
    }
  }

  removePhone(index: number) {
    if (this.phones.controls.length > 1) {
      this.phones.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.form);
  }

  resetForm(): void {
    this.form.reset();
  }

  /* Validatos */

  confirmedPassword(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (group.get('password').value !== group.get('confirmPassword').value) {
        return { notSamePassword: 'Password and confirm password has to be the same.' };
      }
      return null;
    };
  }

  allFormControlsAreValid(): ValidatorFn {
    return (formArray: FormArray): ValidationErrors => {
      if (formArray.controls.every( control => control.valid ) ) {
        return null;
      }

      return { notValidPhone: 'Some phone is not valid' };
    };
  }

  /* End Validatos */

  /* Async Validators */
  emailRegistered(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.mockService.getMockData().pipe(
        map( res => ( res.some( resItem => resItem.email === control.value) ) ? {emailRegistered: true} : null )
      );
    };
  }

  // It can be defined in validators files and just need to set as param the instance of the service
  emailRegisteredWithoutDependencies(service: MockService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return service.getMockData().pipe(
        map( res => ( res.some( resItem => resItem.email === control.value) ) ? {emailRegisteredWithoutDependency: true} : null )
      );
    };
  }
  /* End Async Valdiators */
}
