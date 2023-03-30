import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'countryPipe'
})
export class CountryPipePipe implements PipeTransform {

  transform(value: Trip[], args: string[]): Trip[] {
    if (!args || value.length===0 || args.length===0){
      return value;
    }
    return value.filter((trip)=>args.includes(trip.destination));
  }

}
