import { Component, Input } from '@angular/core';
import { Data } from '../data.model';
import { ServiceMove } from '../service.move';

@Component({
  selector: 'app-choice-area',
  templateUrl: './choice-area.component.html',
  styleUrls: ['./choice-area.component.css']
})
export class ChoiceAreaComponent{
  parentData:Data[] | undefined;
   constructor(private moveEmitter : ServiceMove){
    this.parentData=moveEmitter.getData();
  } 

}
