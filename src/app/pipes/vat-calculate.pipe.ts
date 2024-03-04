import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatCalculate'
})
export class VatCalculatePipe implements PipeTransform {

  transform(value: number, vat: number): number {
    return (value*vat/100);
  }

}
