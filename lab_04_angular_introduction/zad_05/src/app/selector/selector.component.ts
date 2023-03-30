import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Car } from '../car.model';
import { DataService } from '../dataservice';



@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  brands:string[]=[];
  models: Car[] | undefined;
  colors:string[]|undefined;
  currentChoiceBrand:string='';
  currentChoiceModelName='';
  currentChoiceModel:Car | undefined;

 

  modelPlaceholder='Wybierz model';
  needed=true;

  chosenBrand=false;
  chosenModel=false;

  constructor(private dataService: DataService){
  }

  ngOnInit(){
    console.log("BRANDS on Init")
    this.brands=this.dataService.getBrands();
    console.log(this.brands)
    this.models=this.dataService.getModels(this.currentChoiceBrand);
  }


  newBrand(event:any){
    this.currentChoiceBrand=event.target.value;
    this.models= this.dataService.getModels(this.currentChoiceBrand);
    this.dataService.emitChange_brand.emit(this.currentChoiceBrand);
    this.chosenBrand=true;
    this.chosenModel=false;
    let tmp= <HTMLOptionElement>document.getElementById('model-sel');
    tmp?.setAttribute('selected','true');
    tmp.selected=true;
  }

  newModel(event:any){
     this.currentChoiceModelName=event?.target.value;
     this.dataService.emitChange_model.emit(this.currentChoiceModelName);
     this.chosenModel=true;
     this.currentChoiceModel = this.models?.find((e)=>e.model===this.currentChoiceModelName);
     this.colors=this.currentChoiceModel?.colors;
  }

}
