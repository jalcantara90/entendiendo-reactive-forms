import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'phones-form',
  templateUrl: './phones-form.component.html',
  styleUrls: ['./phones-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonesFormComponent implements OnInit {

  phones: number[] = [1];

  constructor() { }

  ngOnInit() {
  }

  addPhone() {
    if (this.phones.length < 3) {
      this.phones.push(1);
    }
  }

  removePhone(index: number) {
    if (this.phones.length > 1) {
      this.phones.splice(index, 1);
    }
  }
}
