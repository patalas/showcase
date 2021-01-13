import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dayMonthYear',
})
export class DayMonthYearPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    if (!value) { return null; }
    return padNumber(value.day) + "." + padNumber(value.month) + "." + value.year;
  }
}

export function padNumber(value: number) {
  if (!isNaN(Number(value))) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

