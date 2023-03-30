import { Component } from '@angular/core';
import { TripCountService } from 'src/app/tripcountservice';

@Component({
  selector: 'app-booked-trip-info',
  templateUrl: './booked-trip-info.component.html',
  styleUrls: ['./booked-trip-info.component.css']
})
export class BookedTripInfoComponent {
  constructor(private counterUpdate : TripCountService){}
  
  bookedNum :number =0;

  ngOnInit(){
    this.counterUpdate.TripCount.subscribe((num)=>{
      this.bookedNum=num;
    })
  }
}
