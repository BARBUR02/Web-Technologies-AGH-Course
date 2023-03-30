import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/trip.model';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { tripDataService } from 'src/app/tripdataservice';
import { TripCountService } from 'src/app/tripcountservice';

@Component({
  selector: 'app-shopping-card-item',
  templateUrl: './shopping-card-item.component.html',
  styleUrls: ['./shopping-card-item.component.css']
})

export class ShoppingCardItemComponent implements OnInit{
  @Input() trip:Trip;
  @Input() singleTripNum:number=0;
  @Input() value:number;
  faCartShopping=faCartShopping;

  constructor(private dataService: tripDataService, private countService: TripCountService){}

  ngOnInit(){
    console.log("essa");
    console.log(this.value)
  }

  buyTrip(){
    const arr= this.dataService.trips;
    arr.forEach(trip=>{
      if (trip.name === this.trip.name){
        trip.places=trip.places-this.singleTripNum;
      }
      
    })
    this.countService.tripBought(this.trip);
  }


}
