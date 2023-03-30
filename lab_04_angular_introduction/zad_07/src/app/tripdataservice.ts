// import { Injectable } from "@angular/core";
import { Injectable } from '@angular/core';
import TripJson from '../assets/trips.json';
import { Trip } from './trip.model';
import {Subject} from 'rxjs'
import { max } from 'rxjs-compat/operator/max';


@Injectable()
export class tripDataService{
    // trips :Trip[]; TripJson; 
    // currTrips:Trip;
    trips :Trip[];
    bordervals: number[]

    constructor(){
        this.trips =TripJson
        let val1 = Math.min(...this.trips.map(trip=>trip.price))
        let val2 = Math.max(...this.trips.map(trip=>trip.price))
        this.bordervals=[val1,val2]
    }

    singleTripUpdate = new Subject<{trip :Trip,case : boolean}>
    TripsUpdate = new Subject<Trip[]>;
    BorderValuesUpdate = new Subject<number[]>;
    UpdateTripCount = new Subject<number>;

    addTrip(trip:Trip){
    this.trips.push(trip);
    this.updateBorderItems();
    this.singleTripUpdate.next({trip: trip,case: true})
    this.TripsUpdate.next( (this.trips ));
    }

    removeTrip(trip:Trip){
    this.trips = this.trips.filter((item:Trip)=>item!==trip);
    this.updateBorderItems();
    this.singleTripUpdate.next({trip: trip,case: false})
    this.TripsUpdate.next( (this.trips ));
    }
    
    updateBorderItems(){
        const minVal = Math.min(...this.trips.map(trip=>trip.price));
        const maxVal = Math.max(...this.trips.map(trip=>trip.price));
        if (minVal!==this.bordervals[0] || maxVal !==this.bordervals[1])
        this.BorderValuesUpdate.next([minVal,maxVal])
        return [minVal,maxVal]
    }

    initTrips(){
        this.updateBorderItems();
        return this.trips;
    }

    getTrips(){
        return this.trips;
    }

}
