import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/trip.model';
import { TripCountService } from 'src/app/tripcountservice';
import { tripDataService } from 'src/app/tripdataservice';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css']
})
export class TripItemComponent {
  @Input() trip:Trip;
  @Input() maxPrice:number;
  @Input() minPrice:number;
  @Input()    currectCount : number;
  @Input()    avaiable : number;

  

  hoverState=0;
  rating=0;
  faStar=faStar;
  stars=[1,2,3,4,5];

  onStarEnter(starId:number){
    this.hoverState=starId;
  }

  onStarLeave(){
    this.hoverState=0;
  }
  onStarClicked(starId:number){
    if (this.rating===starId){
      this.rating=0;
      this.tripCountUpdate.tripRate(this.trip,this.rating);
      return
    }
    this.rating=starId;
    this.tripCountUpdate.tripRate(this.trip,this.rating);
  }

  maxnum:number;
  // avaiable:number;
  state:number;

  constructor(private tripUpdateService: tripDataService, private tripCountUpdate : TripCountService, private router: Router ){
    this.tripUpdateService.updateBorderItems();
  }

  ngOnInit(){
    this.rating=this.tripCountUpdate.getRating(this.trip);
    console.log("trip rating: "+this.trip.name+ this.rating)
    // this.avaiable=this.trip.places;
    this.maxnum=this.trip.places;
  }

  tripAdd(){
    console.log(this.avaiable);
    if (this.avaiable<=0){
      return;
    }
    this.avaiable=this.avaiable-1;
    this.tripCountUpdate.bookTrip(this.trip);
    // console.log(this.avaiable)

  }

  tripReturn(){
    console.log(this.avaiable);
    if (this.avaiable>=this.maxnum){
      return;
    }

    this.tripCountUpdate.unbookTrip(this.trip);
    this.avaiable=this.avaiable+1;
    // console.log(this.avaiable)
    
  }

  tripDestroy(){
    this.tripUpdateService.removeTrip(this.trip);
  }

  moveToDetails(){
    this.router.navigate(['/trips-for-you',this.trip.name.split(' ').join('-'),this.trip.destination.split(' ').join('-')] )
  }


}
