import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'pricePipe'
})
export class PricePipePipe implements PipeTransform {

  transform(value: Trip[], args: number[]): Trip[] {
    if (!value || value.length===0  || !args || args.length===0)  {return value}
    return value.filter(trip=> trip.price<=args[1] && trip.price>=args[0])
  }

}
