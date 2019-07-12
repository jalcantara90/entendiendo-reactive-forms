import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

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
