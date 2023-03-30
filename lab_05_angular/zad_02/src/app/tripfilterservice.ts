import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class tripFilterService{
    priceBorders:number[]=[];
    dateBorders:Date[]=[];
    stars :number[]=[];
    countries: string[]=[];
    changeInformator = new Subject<any>;

    

    refreshTrips(){
        this.changeInformator.next();
    }    

    updatePrice(num1:number,num2:number){
        this.priceBorders=[num1,num2];
        this.refreshTrips();
    }
    updateDate(date1:string,date2:string){
        this.dateBorders=[new Date(date1),new Date(date2)];
        this.refreshTrips();
    }
    updateStars(stars:number[]){
        this.stars=stars;
        this.refreshTrips();
    }
    updateCountries(countries:string[]){
        this.countries=countries;
        this.refreshTrips();
    }

}