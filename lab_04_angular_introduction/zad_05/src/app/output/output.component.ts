import { Component, OnInit } from '@angular/core';
import { Car } from '../car.model';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit{
  car:Car | undefined;
  color:string='';
  tmpCar : { car: Car; color: string; } | undefined
  show=false;

  constructor(private carEmitterService: DataService){
    };

    ngOnInit(){
      this.carEmitterService.emitChange_car.subscribe(arg =>{
      this.car=arg.car
      this.color = arg.color;
      console.log("Got the event: ");
      console.log(arg);
      this.show=true;
    });
    this.carEmitterService.emitChange_brand.subscribe(arg =>{
      this.show=false;
    });
    this.carEmitterService.emitChange_model.subscribe(arg =>{
      this.show=false;
    });

  }

  

}
