import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  public form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(\w*gmail)/)
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

}
