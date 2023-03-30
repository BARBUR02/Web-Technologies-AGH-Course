import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: Trip[], args: Date[]): Trip[] {
    if (args.length===0) return value
    if (isNaN(args[0].getTime()) && isNaN(args[1].getTime()) ){
      return value;
    }
    // console.log( value.forEach(trip=>{
    //   console.log(trip.destination,trip.startDate, trip.endDate);
    //   console.log(args[0],args[1])
    //   console.log('\n\n\ncheck: ',args[0]==undefined || args[1]==undefined,'\n\n');
    //   console.log(new Date(trip.startDate)>=args[0]
    //   && new Date(trip.endDate)<=args[1] ? trip.destination +' true\n\n\n' : trip.destination+' false\n\n\n' )
    // }))
    return value.filter(trip=>{
      if( isNaN(args[0].getTime()) || new Date(trip.startDate)>args[0] ) return true; return false}) .filter(trip=>{
      if (  (isNaN(args[1].getTime())) || new Date(trip.endDate)<args[1])
      return true; return false});
      
      
  
    
  }

}
