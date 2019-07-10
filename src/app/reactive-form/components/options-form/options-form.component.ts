import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
