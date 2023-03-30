import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Opinion } from '../opinion.model';
import { Trip } from '../trip.model';
import { TripCountService } from '../tripcountservice';
import { tripDataService } from '../tripdataservice';


@Component({
  selector: 'app-single-trip-view',
  templateUrl: './single-trip-view.component.html',
  styleUrls: ['./single-trip-view.component.css']
})
export class SingleTripViewComponent implements OnInit {
  faAngleRight=faAngleRight
  faAngleLeft=faAngleLeft
  slides=[];
  stars=[1,2,3,4,5]
  currSlide=0;
  moveUnit =  650;
  hoverState=0;
  rating=0;
  currCount:number;
  avaiableNum:number;
  opinions:Opinion[];
  // name:string='City of Kings';
  // destination:string='Krakow';
  trip:Trip;

  opinionForm: FormGroup;

  constructor(private tripCountUpdate : TripCountService, private dataService: tripDataService,
    private route: ActivatedRoute){}

  ngOnInit(){
    this.slides= Array.from(document.querySelectorAll('.slider-item'));
    console.log(this.slides);
    let name:string;
    let destination:string;
    
    // this.route.params.subscribe((args: Params)=>{
    //   name= args['tripName'];
    //   destination= args['tripDestination']
    // })
    

    name= this.route.snapshot.params['tripName'];
    destination= this.route.snapshot.params['tripDestination']
    name=name.split('-').join(' ');
    destination=destination.split('-').join(' ');

    for ( let i=0; i<this.slides.length;i++){
      this.slides[i].style.transform=`translateX(${(i-this.currSlide)*this.moveUnit}px)`;
    }

    
    this.trip = this.dataService.getTrips().filter(e=>e.name===name && e.destination===destination)[0]
    this.rating=this.tripCountUpdate.getRating(this.trip);
    console.log("Loading rating : ",this.rating)

    let coll = this.tripCountUpdate.tripCollection
    this.currCount = coll.has(this.trip) ? coll.get(this.trip) : 0;
    this.avaiableNum= this.trip.places - this.currCount;
    this.opinionForm= new FormGroup({
      'nick' : new FormControl(null,Validators.required),
      'tripName' : new FormControl(null,[Validators.required, Validators.pattern(`^${this.trip.name}$`)]),
      'opinion' : new FormControl(null, [Validators.required,Validators.maxLength(500), Validators.minLength(50)]),
      'date' : new FormControl(null)
    })

    this.opinions=this.dataService.getOpinions().filter(e=>e.tripName===this.trip.name);
    this.dataService.opinionAdded.subscribe(()=>{
      this.opinions=this.dataService.getOpinions().filter(e=>e.tripName===this.trip.name);
    })


  }

  changePage(){
    console.log("LECIM");
    console.log(this.currSlide);
    for ( let i=0; i<this.slides.length;i++){
      this.slides[i].style.transform=`translateX(${(i-this.currSlide)*this.moveUnit}px)`;
    }
  }

    prevSlide(){
      this.currSlide=  this.currSlide===0 ? this.slides.length-1 : (this.currSlide-1)%this.slides.length;
      this.changePage();
    }

    nextSlide(){
      this.currSlide= (this.currSlide+1)%this.slides.length;
      this.changePage();
    }

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

  submitOpinion(){
    console.log(this.opinionForm.valid)
    if (this.opinionForm.valid){
          console.log(this.opinionForm.value)
          this.dataService.addOpinions(this.opinionForm.value);
          this.opinionForm.reset();

    }
  }
  
  unbookTrip(){
    if (this.avaiableNum>=this.trip.places){
      return ;
    }
    this.currCount--;
    this.avaiableNum++;
    this.tripCountUpdate.unbookTrip(this.trip);
  }

  bookTrip(){
    if (this.avaiableNum<=0){
      return ;
    }
    this.currCount++;
    this.avaiableNum--;
    this.tripCountUpdate.bookTrip(this.trip);
  }


}


  


