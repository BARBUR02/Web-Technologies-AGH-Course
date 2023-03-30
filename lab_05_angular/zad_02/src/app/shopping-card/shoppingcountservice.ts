import { Injectable } from "@angular/core";
import { TripCountService } from "../tripcountservice";

@Injectable()
export class ShoppingCountService{
    totalNum:number;
    totalAmount:number;
    
    constructor (private countUpdate : TripCountService){
    }

    ngOnInit(){
        this.countUpdate.TripCount.subscribe(val=>{
            this.totalNum=val;
        })
        this.countUpdate.TripAmountCount.subscribe(val=>{
            this.totalAmount=val;
        })
    }

    getCount(){
        console.log("Geetting count: ");
        console.log(this.totalNum)
        return this.totalNum;
    }

    getAmount(){
        console.log("Geetting amount: ");
        console.log(this.totalAmount)
        return this.totalAmount;
    }



}