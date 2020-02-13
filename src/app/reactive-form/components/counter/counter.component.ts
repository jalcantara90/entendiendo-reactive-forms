import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ]
})
export class CounterComponent implements ControlValueAccessor {
  @Input() private value = 0;

  constructor() { }

  get counterValue() {
    return this.value;
  }

  set counterValue(val) {
    this.value = val;
    this.onChange(this.value);
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }

  writeValue(value: any) {
    this.counterValue = value;
  }

  onChange = (_: any) => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}

}
