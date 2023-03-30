import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip.model';


type buyType={
        date: Date,
        trip:Trip,
        num: number
}

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: buyType[], args: string[]):  buyType[]{
    if (args.length===0)
      {return value;}
    return value.filter(e=>{
      let result=false;
      let flag=false;
      args.forEach(arg=>{
        switch(arg){
          case 'future': {
            flag = new Date()< new Date(e.trip.startDate);
            if (flag) result=true;
            break;
          }
          case 'in-progress':{ 
            flag = new Date()>= new Date(e.trip.startDate) &&  new Date()<= new Date( e.trip.endDate) ;
            if (flag) result=true;
            break;
          }
          case 'finished':
            {
            flag = new Date()>= new Date(e.trip.endDate);
            if (flag) result=true;
            break;
            }
          default:
        }
      })
      return result
    })
  }

}
