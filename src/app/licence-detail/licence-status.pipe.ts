import { LicenceStatus } from '../model/licence.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'licenceStatusPipe'
})
export class LicenceStatusPipe implements PipeTransform {

  transform(value: LicenceStatus | string): string {
    if (!value) {
      return '';
    }
    switch (value) {
      case LicenceStatus.INVALID: return "Invalid";
      case LicenceStatus.VALID: return "Valid";
    }
    return "unknown: " + value;
  }

}
