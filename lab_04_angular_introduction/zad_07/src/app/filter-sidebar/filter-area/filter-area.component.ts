import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Trip } from 'src/app/trip.model';
import { tripDataService } from 'src/app/tripdataservice';
import { tripFilterService } from 'src/app/tripfilterservice';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.css']
})
export class FilterAreaComponent {
  
  trips: {destination:string,isSelected:boolean}[];
  activeDateStart:'';
  activeDateEnd:'';
  activePriceDown:number;
  activePriceUp:number;
  stars:number[]=[];
  priceForm:FormGroup;
  minVal:number;
  maxVal:number;
  priceOptions:Options;
  manualRefresh: EventEmitter<void>=new EventEmitter<void>();

  constructor(private tripService: tripDataService, private filterService: tripFilterService){}


  ngOnInit(){
    const [minVal,maxVal]=this.tripService.updateBorderItems();
    this.priceForm = new FormGroup({
    sliderControl: new FormControl([minVal, maxVal])
  });
  this.minVal=minVal
  this.maxVal=maxVal

  this.tripService.BorderValuesUpdate.subscribe(num=>{
    this.minVal=num[0];
    this.maxVal=num[1];
    console.log(this.minVal,this.maxVal, "Jestesmy w subscribie!")
    this.reInitForm();
  })
  console.log("jestesmy w ngOnInit!")
  // console.log(minVal,maxVal);
    this.trips=this.tripService.initTrips().map(trip=>
    (
    {
     destination: trip.destination,
     isSelected: false,
    })
 );
 
  this.priceOptions = {
    floor: this.minVal,
    ceil: this.maxVal,
    step: 1
  };

  this.tripService.singleTripUpdate.subscribe(el =>{
    if (el.case){
      if (!this.trips.map((trip)=>trip.destination).includes(el.trip.destination)){
        this.trips.push({destination: el.trip.destination, isSelected: false})
      }
    }
    else {
      const tmpTrips = this.tripService.getTrips();
      if (tmpTrips.filter(trip=>trip.destination==el.trip.destination).length ===0){
        // console.log("to")
        this.trips=this.trips.filter((trip)=>trip.destination!==el.trip.destination)
      }

    }
    const currTrips= this.trips.filter(trip=>trip.isSelected).map(trip=>trip.destination)
    // console.log(this.priceForm.value)
    this.filterService.updateCountries(currTrips);


    })
    
  

  }


  reInitForm(){
     this.priceOptions = {
    floor: this.minVal,
    ceil: this.maxVal,
    step: 1
  }; 
  
    this.priceForm = new FormGroup({
    sliderControl: new FormControl([this.minVal, this.maxVal])})
      
    this.activePriceDown=this.minVal;
    this.activePriceUp=this.maxVal;
    // console.log("W reinit: ",this.minVal,this.maxVal)

    
      this.resetPrice();
  }



  starCheckChange(event){
    // console.log(event)
    event.target.checked ?
    this.stars.push(+event.target.name) :
    this.stars=this.stars.filter(el=>el!==+event.target.name);
    // console.log(this.stars)
    this.filterService.updateStars(this.stars);
  }


  onChangeCountry(){
    // console.log(this.trips);
    // console.log(this.trips.filter(trip=>trip.isSelected));
    const currTrips= this.trips.filter(trip=>trip.isSelected).map(trip=>trip.destination)
    // console.log(this.priceForm.value)
    this.filterService.updateCountries(currTrips);
  }

  onChangePrice(){

    // console.log("czy dzila")
    // console.log(this.activePriceDown)
    // console.log(this.activePriceUp)
    this.filterService.updatePrice(this.activePriceDown,this.activePriceUp);
    // console.log(this.priceForm.value);
    
  }

  onChangeStartDate(event){
    this.activeDateStart=event.target.value;
    // console.log(this.activeDateStart,this.activeDateEnd)
    this.filterService.updateDate(this.activeDateStart, this.activeDateEnd);
    // this.filterService.updateDate([]);
  }

  onChangeEndDate(event){
    this.activeDateEnd=event.target.value;
    // console.log(event)
    // console.log(event.target.value)
    this.filterService.updateDate(this.activeDateStart, this.activeDateEnd);
  }


  resetPrice(): void{

    // console.log("Prubuje zresetowac!",this.priceForm )
    this.activePriceDown=this.minVal;
    this.activePriceUp=this.maxVal;
    // console.log(this.activePriceDown)
    // console.log(this.activePriceUp)
    this.priceForm.reset({sliderControl: [this.minVal,this.maxVal]});
    this.filterService.updatePrice(this.activePriceDown,this.activePriceUp);
  }

}
