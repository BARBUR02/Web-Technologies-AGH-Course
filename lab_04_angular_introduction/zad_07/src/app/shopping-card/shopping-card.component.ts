import { Component,  OnInit } from '@angular/core';
import { Trip } from '../trip.model';
import { TripCountService } from '../tripcountservice';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css'],
})
export class ShoppingCardComponent implements OnInit{
  totalNum:number;
  totalPrice:number;
  tripVals : Map<Trip,number>;
  tripValNames:Trip[];

  constructor(private countUpdateTrips : TripCountService,){}

  
  ngOnInit(){
    this.totalNum=this.countUpdateTrips.getTotalNum();
    this.totalPrice=this.countUpdateTrips.getTotalAmount();
    this.tripVals=this.countUpdateTrips.getTripsCount();
    this.tripValNames=[...this.tripVals.keys()];
    
}


}