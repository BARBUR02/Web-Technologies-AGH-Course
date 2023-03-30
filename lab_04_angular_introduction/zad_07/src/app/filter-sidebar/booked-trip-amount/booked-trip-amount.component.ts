import { Component } from '@angular/core';
import { TripCountService } from 'src/app/tripcountservice';

@Component({
  selector: 'app-booked-trip-amount',
  templateUrl: './booked-trip-amount.component.html',
  styleUrls: ['./booked-trip-amount.component.css']
})
export class BookedTripAmountComponent {
  totalAmount:number=0;

  constructor(private amountBookedService : TripCountService){}

  ngOnInit(){
    this.amountBookedService.TripAmountCount.subscribe((val)=>{
      this.totalAmount=val;
    })
  }

}
