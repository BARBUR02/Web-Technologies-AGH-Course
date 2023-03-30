import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() starId:number;
  @Input()   rating:number;
  faStar=faStar;

  @Output() starEnter: EventEmitter<number>=new EventEmitter<number>();
  @Output() starLeave: EventEmitter<number>=new EventEmitter<number>();
  @Output() starClicked: EventEmitter<number>=new EventEmitter<number>();

  onStarEnter(){
    this.starEnter.emit(this.starId);
  }

  onStarLeave(){
    this.starLeave.emit();
  }

  onStarClicked(){
    this.starClicked.emit(this.starId);
  }

  

}
