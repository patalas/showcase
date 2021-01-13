import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';

@Component({
  selector: 'mp-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  @Input() control: AbstractControl;

  @Input() model: NgModel;

  @Input() divClass;

  constructor() { }

  ngOnInit(): void {
  }

  hasErrors(): boolean {
    if (this.control) {
      return !!this.control.errors && (this.control.touched);
    }
    if (this.model) {
      return this.model.invalid && (this.model.dirty || this.model.touched);
    }
    return false;
  }

  hasErrorRequired() {
    if (this.control) {
      return this.control.errors.required;
    } else {
      return this.model.errors.required;
    }
  }

}
