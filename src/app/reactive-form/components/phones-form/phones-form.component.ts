import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'phones-form',
  templateUrl: './phones-form.component.html',
  styleUrls: ['./phones-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonesFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() addPhone: EventEmitter<void> = new EventEmitter<void>();
  @Output() removePhone: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }


}
