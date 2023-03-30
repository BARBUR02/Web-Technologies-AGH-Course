import { Component, Input } from '@angular/core';
import { Car } from 'src/app/car.model';
import { DataService } from 'src/app/dataservice';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent {
  @Input() color:string='';
   @Input() car:Car | undefined;

  constructor(private dataService: DataService){}

  EmitEndEvent(){
    console.log("We chose car with its color!")
    this.dataService.emitChange_car.emit({car : this.car,color: this.color});
    console.log({car : this.car,color: this.color});
  }

}
