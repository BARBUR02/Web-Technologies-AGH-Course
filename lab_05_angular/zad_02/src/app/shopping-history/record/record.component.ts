import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/trip.model';


type buyType={
        date: Date,
        trip:Trip,
        num: number
}

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{
  @Input() data: buyType;
  status='';

  ngOnInit(){
    if (new Date() <= new Date(this.data.trip.startDate))
  {
    this.status='future'
  }

    else if (new Date()<= new Date(this.data.trip.endDate)){
      this.status='in-progress'
  }
    else{
      this.status='finished'
    }
  }

}
