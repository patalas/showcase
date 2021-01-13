import {NgModel} from "@angular/forms";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const datestructCheck = (model: NgModel) => {
  console.log("check", model);
  if (!model) {
    console.error("model is not set!");
    return;
  }
  const value = model.value;
  if (value && (typeof value === 'string' || value instanceof String)) {
    console.log("Datestruct is invalid", value);
    model.control.setValue(null);
  }
};


export function dateToDs(date: any): NgbDateStruct {
  if (!date) {
    return null;
  }

  if (date instanceof Date) {
  return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  return date;
}

export const dsToDate = (value) => {
  if (!value) { return null; }

  if (value instanceof Date) {
    return value;
  }
  return new Date(Date.UTC(value.year, value.month - 1, value.day));
}
