import { Component } from '@angular/core';
import { Data } from '../data.model';
import { ServiceMove } from '../service.move';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent {
  
  header='';
  desc='';


  constructor(private serviceM:ServiceMove){
    this.serviceM.moveEmitter.subscribe(
      (tmp: Data)=>{
        this.header=tmp.header;
        this.desc=tmp.info;
      }
    )
  }
}
