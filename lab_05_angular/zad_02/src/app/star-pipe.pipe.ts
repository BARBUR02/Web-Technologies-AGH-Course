import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'starPipe'
})
export class StarPipePipe implements PipeTransform {

  transform(value: Trip[], clicked: number[] , liveratings: Map<Trip,number>): Trip[] {
    if ( clicked.length===0) return value
    return value.filter((trip)=>{
      if (liveratings.has(trip)) return clicked.includes( liveratings.get(trip))
      return false
    })
  }

}
