import { FormControl, Validators, FormArray } from '@angular/forms';

export class BasicForm {

  name: FormControl = new FormControl('', [ Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/@(\w*gmail)/)
  ]);
  password: FormControl = new FormControl('', [ Validators.required, Validators.minLength(4) ]);
  confirmPassword: FormControl = new FormControl('', [ Validators.required, Validators.minLength(4) ]);
  from: FormControl = new FormControl();
  to: FormControl = new FormControl();
  hasPhones: FormControl = new FormControl(false);
  options: FormControl = new FormControl(null, [ Validators.required]);
  terms: FormControl = new FormControl(null, [ Validators.requiredTrue ]);
  vehicle: FormControl = new FormControl('hasNotVehicle');

  constructor(data?: any) {
    if (data) {
      this.name = new FormControl(data.name, [ Validators.required]);
      this.email =  new FormControl(data.email, [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(\w*gmail)/)
      ]);
      this.password = new FormControl(data.password, [ Validators.required, Validators.minLength(4) ]);
      this.confirmPassword = new FormControl(data.confirmPassword, [ Validators.required, Validators.minLength(4) ]);
      this.from = new FormControl(data.from);
      this.to = new FormControl(data.to);
      this.hasPhones = new FormControl(data.hasPhones);
      this.options = new FormControl(data.options, [ Validators.required]);
      this.terms = new FormControl(data.terms, [ Validators.requiredTrue ]);
      this.vehicle = new FormControl(data.vehicle);
    } else {
      this.name = new FormControl('', [ Validators.required]);
      this.email = new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(\w*gmail)/)
      ]);
      this.password = new FormControl('', [ Validators.required, Validators.minLength(4) ]);
      this.confirmPassword = new FormControl('', [ Validators.required, Validators.minLength(4) ]);
      this.from = new FormControl();
      this.to = new FormControl();
      this.hasPhones = new FormControl(false);
      this.options = new FormControl(null, [ Validators.required]);
      this.terms = new FormControl(null, [ Validators.requiredTrue ]);
      this.vehicle = new FormControl('hasNotVehicle');
    }
  }
}

export class PhonesForm extends BasicForm {
  phones: FormArray;

  constructor(data) {
    super(data);

    this.phones = new FormArray([
      new FormControl(null, [Validators.required])
    ]);
  }
}

