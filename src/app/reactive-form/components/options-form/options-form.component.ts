import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsFormComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
