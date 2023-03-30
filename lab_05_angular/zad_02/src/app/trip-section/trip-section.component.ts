import { Component } from '@angular/core';
// import TripJson from '../../assets/trips.json';
import { Trip } from '../trip.model';
import { TripCountService } from '../tripcountservice';
import { tripDataService } from '../tripdataservice';
import { CountryPipePipe } from '../country-pipe.pipe';
import { PricePipePipe } from '../price-pipe.pipe';
import { DatePipe } from '@angular/common';
import { StarPipePipe } from '../star-pipe.pipe';
import { tripFilterService } from '../tripfilterservice';

@Component({
  selector: 'app-trip-section',
  templateUrl: './trip-section.component.html',
  styleUrls: ['./trip-section.component.css']
})
export class TripSectionComponent {
  // trips :Trip[]=TripJson;
  trips :Trip[];
  minPrice :number;
  maxPrice :number;
  tripCountMap = new Map<Trip,number>();
  dates:Date[]=[]
  tripRatings:Map<Trip,number>;
  clicked=[]
  prices=[]
  countries=[]

  constructor(private tripsUpdateService : tripDataService, private tripsCountService: TripCountService, private filterService: tripFilterService){
    // this.trips=this.tripsUpdateService.initTrips();
  }

  ngOnInit(){
    this.tripRatings=this.tripsCountService.getTripRatings();
    this.trips=this.tripsUpdateService.initTrips();
    this.tripsUpdateService.TripsUpdate.subscribe((data: Trip[])=>{
      this.trips=data;
    });
    this.countries= this.filterService.countries;
    this.clicked= this.filterService.stars;
    this.prices=this.filterService.priceBorders;
    this.tripsUpdateService.BorderValuesUpdate.subscribe((arg)=>{
      this.minPrice=arg[0];
      this.maxPrice=arg[1];
    })
    this.tripCountMap = this.tripsCountService.getTripsCount() ;
    this.filterService.changeInformator.subscribe(()=>{
      // console.log("Uruchamiamy pipe!")
      this.clicked=this.filterService.stars
      this.countries=this.filterService.countries
      this.prices=this.filterService.priceBorders;
      this.dates=this.filterService.dateBorders;
      // console.log("Clicked",this.clicked);
      // console.log("Countries",this.countries);
      // console.log("Dates",this.dates);
      // console.log("Prices",this.prices);
      this.trips=this.trips.slice();
    })
  }

}
