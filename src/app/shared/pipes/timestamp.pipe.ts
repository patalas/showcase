import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    if (!value || isNaN(Number(value))) { return null; }
    return new Date(value);
  }

}

