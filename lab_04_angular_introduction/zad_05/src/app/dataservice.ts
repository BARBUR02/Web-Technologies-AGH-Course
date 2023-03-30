import { EventEmitter, Injectable } from "@angular/core";
import { Car } from './car.model';
import data from './cars.json'


@Injectable()
export class DataService{
    carList: Car[]=[];
    distinctBrand: string[]=[];
    models = new Map<string,Car[]> ();


    emitChange_brand = new EventEmitter<string>()
    emitChange_model = new EventEmitter<string>()
    emitChange_color = new EventEmitter<string>()
    emitChange_car = new EventEmitter<{car:Car | undefined,color:string}>();

    
    
     constructor(){
        this.carList=data;
        const tmp=this.carList.map((car=>car.brand));
        this.distinctBrand=[... new Set(tmp)];
        for (const brand of this.distinctBrand){
        const arr=this.carList.filter((car)=>car.brand===brand);
        this.models.set(brand,arr);
    }
    }

  getBrands(){
    return this.distinctBrand.slice();
  }
  getModels(brand:string){
    return this.models.get(brand)?.slice();
}
 

}