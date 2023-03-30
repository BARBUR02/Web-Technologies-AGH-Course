import { Component, Input } from '@angular/core';
import { Data } from 'src/app/data.model';
import { ServiceMove } from 'src/app/service.move';

@Component({
  selector: 'app-choice-item',
  templateUrl: './choice-item.component.html',
  styleUrls: ['./choice-item.component.css']
})
export class ChoiceItemComponent {
  @Input() infoObject: Data = new Data('','','');
  constructor(private moveEmitter : ServiceMove){}
  EmitInfo(){
    this.moveEmitter.moveEmitter.emit(this.infoObject);
  }

}



