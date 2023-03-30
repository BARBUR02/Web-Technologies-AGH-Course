// import { Injectable } from "@angular/core";
import { Injectable } from '@angular/core';
import TripJson from '../assets/trips.json';
import { Trip } from './trip.model';
import {Subject} from 'rxjs'
import { max } from 'rxjs-compat/operator/max';
import { Opinion } from './opinion.model';
import { addDoc, collection, Firestore } from '@firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreServiceService } from './firestore-service.service';


@Injectable()
export class tripDataService{
    // trips :Trip[]; TripJson; 
    // currTrips:Trip;
    opinions : Opinion[]=[];
    trips :Trip[];
    bordervals: number[]
    // tripsCollection;

    constructor(private firestoreService: FirestoreServiceService){
        this.trips=TripJson;
        // firestoreService.getTripList().subscribe(res=>{
            // this.trips=res.map(e=>{
            //     console.log(e.payload.doc.id)
            //     return {
            //         ... e.payload.doc.data() as {}
            //     } as Trip
            // });
        //     let val1 = Math.min(...this.trips.map(trip=>trip.price))
        // let val2 = Math.max(...this.trips.map(trip=>trip.price))
        // this.bordervals=[val1,val2]
        // })
        // console.log("Firestore: ", this.firestore)
        // this.tripsCollection=this.firestore.collection('trips');
        // for ( let trip of this.trips){
        //     console.log(addDoc(this.tripsCollection,{...trip} ));
        // }
        let val1 = Math.min(...this.trips.map(trip=>trip.price))
        let val2 = Math.max(...this.trips.map(trip=>trip.price))
        this.bordervals=[val1,val2]
    }

    singleTripUpdate = new Subject<{trip :Trip,case : boolean}>
    TripsUpdate = new Subject<Trip[]>;
    BorderValuesUpdate = new Subject<number[]>;
    UpdateTripCount = new Subject<number>;
    opinionAdded = new Subject<any>;

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

    getOpinions(){
        return this.opinions;
    }
    addOpinions(opinion:Opinion){
        this.opinions.push(opinion);
        this.opinionAdded.next();
    }

}
