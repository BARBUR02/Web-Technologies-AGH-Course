import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/trip.model';

@Component({
  selector: 'app-shopping-card-item',
  templateUrl: './shopping-card-item.component.html',
  styleUrls: ['./shopping-card-item.component.css']
})

export class ShoppingCardItemComponent implements OnInit{
  @Input() trip:Trip;
  @Input() singleTripNum:number=0;
  @Input() value:number;


  ngOnInit(){
    console.log("essa");
    console.log(this.value)
  }

}
