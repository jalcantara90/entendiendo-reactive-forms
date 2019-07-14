import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
  FormBuilder
} from '@angular/forms';
import { MockService } from '../../services/mock.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private hasPhonesSubscription: Subscription = new Subscription();
  private vehicleSubscription: Subscription = new Subscription();

  constructor(
    private mockService: MockService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required] ],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/@(\w*gmail)/)
        ],
        this.emailRegistered().bind(this),
        this.emailRegisteredWithoutDependencies(this.mockService)
      ],
      password: ['', [Validators.required, Validators.minLength(4) ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4) ]],
      from: [''],
      to: [''],
      hasPhones: [false],
      options: [null, [Validators.required]],
      terms: [null, [Validators.requiredTrue]],
      vehicle: ['hasNotVehicle']
    }, { validators: this.confirmedPassword() });

    this.hasPhonesSubscription = this.form.get('hasPhones').valueChanges.pipe(
      tap((value) => this.tooglePhones(value))
    ).subscribe();

    this.vehicleSubscription = this.form.get('vehicle').valueChanges.pipe(
      tap((value) => this.setVehicleControls(value))
    ).subscribe();
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    if (this.phones.controls.length < 3) {
      this.phones.insert(
        this.phones.controls.length,
        this.fb.control(null, [Validators.required])
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

  tooglePhones( hasPhones: boolean ): void {
    if (hasPhones) {
      this.form.addControl(
         'phones',
         this.fb.array([
           this.fb.control(null, [Validators.required])
         ], { validators: this.allFormControlsAreValid() })
      );
    } else {
      this.form.removeControl('phones');
    }
  }

  setVehicleControls(value: string): void {
    switch (value) {
      case 'car':
        this.removeVehicleControls();
        this.form.addControl('plate', this.fb.control(null, Validators.required) );
        this.form.addControl('manyDors', this.fb.control(0, Validators.required) );
        break;
      case 'moto':
        this.removeVehicleControls();
        this.form.addControl('plate', this.fb.control(null, Validators.required) );
        break;
      default:
        this.removeVehicleControls();
        break;
    }
  }

  private removeVehicleControls(): void {
    this.form.removeControl('plate');
    this.form.removeControl('manyDors');
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

  ngOnDestroy(): void {
    this.hasPhonesSubscription.unsubscribe();
    this.vehicleSubscription.unsubscribe();
  }
}
