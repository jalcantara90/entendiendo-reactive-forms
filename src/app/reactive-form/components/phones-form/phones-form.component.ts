import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'phones-form',
  templateUrl: './phones-form.component.html',
  styleUrls: ['./phones-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonesFormComponent implements OnInit {

  @Input() phones: number[];
  @Output() addPhone: EventEmitter<void> = new EventEmitter<void>();
  @Output() removePhone: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }


}
