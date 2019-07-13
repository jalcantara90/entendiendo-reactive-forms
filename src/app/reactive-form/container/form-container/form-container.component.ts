import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

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
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl(),
      hasPhones: new FormControl(''),
      phones: new FormArray([
        new FormControl(null)
      ]),
      options: new FormControl(null),
      terms: new FormControl(false)
    });
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    if (this.phones.controls.length < 3) {
      this.phones.controls.push(
        new FormControl(null)
      );
    }
  }

  removePhone(index: number) {
    if (this.phones.controls.length > 1) {
      this.phones.controls.splice(index, 1);
    }
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
