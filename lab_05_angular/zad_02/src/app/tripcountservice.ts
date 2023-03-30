import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs-compat/operator/map";
import { Trip } from "./trip.model";

type buyType={
        date: Date,
        trip:Trip,
        num: number
}

@Injectable()
export class TripCountService{
    

    tripNumber:number=0;
    totalAmount:number=0;
    tripRating = new Map<Trip,number>();
    tripCollection = new Map<Trip, number>();
    TripCount = new Subject<number>();
    TripAmountCount = new Subject<number>();
    TripBoughtCollection :buyType[]=[];

    bookTrip(trip:Trip){
        this.tripNumber+=1;
        if ( this.tripCollection.has(trip)){
            this.tripCollection.set(trip,this.tripCollection.get(trip)+1)
        }
        else{
            this.tripCollection.set(trip,1);
        }
        this.totalAmount+=trip.price
                // console.log("Laczna cena: "+ this.totalAmount)

        this.TripCount.next(this.tripNumber);
        this.TripAmountCount.next(this.totalAmount);
        // console.log(this.tripCollection)
    }

    unbookTrip(trip:Trip){
        this.tripNumber-=1;
        if ( this.tripCollection.has(trip)){
            if (this.tripCollection.get(trip)===1){
                this.tripCollection.delete(trip);
            }
            else{
            this.tripCollection.set(trip,this.tripCollection.get(trip)-1)
            }
        }
        this.totalAmount-=trip.price
        // console.log("Laczna cena: "+ this.totalAmount)
        this.TripAmountCount.next(this.totalAmount);
        this.TripCount.next(this.tripNumber);
        // console.log(this.tripCollection)
    }

    getFullBooking(){
        const resultArr = [ [...this.tripCollection.keys()].map((key)=> [key,this.tripCollection.get(key)]) ];
        console.log(resultArr);
        return resultArr;
    }

    getTripsCount(){
        return this.tripCollection;
    }

    getTotalNum(){
        return this.tripNumber;
    }
    getTotalAmount(){
        return this.totalAmount;
    }

    tripRate(trip:Trip,rate:number){
        this.tripRating.set(trip,rate);
    }


    getRating(trip:Trip){
        if (!this.tripRating.get(trip)){
            this.tripRating.set(trip,0);
            return 0;
        }
        return this.tripRating.get(trip);
    }

    getTripRatings(){
        return this.tripRating;
    }

    tripBought(trip){
        this.tripNumber-=this.tripCollection.get(trip);
        this.TripBoughtCollection.push({date: new Date(), trip: trip, num: this.tripCollection.get(trip) })

        
        
        this.totalAmount-=trip.price*this.tripCollection.get(trip)
        this.tripCollection.delete(trip);
        // console.log("Laczna cena: "+ this.totalAmount)
        this.TripAmountCount.next(this.totalAmount);
        this.TripCount.next(this.tripNumber);
    }
}