import {Pipe, PipeTransform} from "@angular/core";
import { dsToDate } from '../datestruct-utils';

@Pipe({
  name: 'dsToDate',
})
export class DateStructToDatePipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return dsToDate(value);
  }
}
