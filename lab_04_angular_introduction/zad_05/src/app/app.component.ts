import { Component } from '@angular/core';
import { Car } from './car.model';
import { DataService } from './dataservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
})
export class AppComponent {
  title = 'zad_05v2';
  carList: Car[]=[];
  distinctBrand: string[]=[];
  models = new Map<string,Car[]> ();
  showOutput=false;



  constructor(private dataService: DataService){
    this.dataService.emitChange_brand.subscribe(e=>{
      this.showOutput=false;
    })
    this.dataService.emitChange_model.subscribe(e=>{
      this.showOutput=false;
    })
    this.dataService.emitChange_car.subscribe(e=>{
      this.showOutput=true;
    })
  }
}
