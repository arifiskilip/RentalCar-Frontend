import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carsSearch'
})
export class CarsSearchPipe implements PipeTransform {

  transform(value: Car[],text: string): Car[] {

    text = text !== null ? text.toLocaleLowerCase() : "";

    return text ? value.filter((c:Car)=> c.color.name.toLocaleLowerCase().indexOf(text)
    !== -1 || c.modelName.toLocaleLowerCase().indexOf(text) !== -1 || c.brand.name.toLocaleLowerCase().indexOf(text) !== -1) : value;
  }

}
