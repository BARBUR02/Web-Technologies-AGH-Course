import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Trip } from '../trip.model';
import { TripCountService } from '../tripcountservice';
import { FilterPipePipe } from './filter-pipe.pipe';

type buyType={
        date: Date,
        trip:Trip,
        num: number
}

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.css']
})


export class ShoppingHistoryComponent implements OnInit{

  

  constructor(private countService: TripCountService){}

  checked:string[]=[];
  filterForm: FormGroup;
  purchase: buyType[];

  ngOnInit(): void {
    this.purchase=this.countService.TripBoughtCollection;
    this.filterForm = new FormGroup({
      'future' : new FormControl(null),
      'in-progress' : new FormControl(null),
      'finished' : new FormControl(null),
    })
  }

  onChange(){
    console.log(this.filterForm.value);
    console.log(this.filterForm);
    const tmp=[];
    for ( let str of ['future','in-progress','finished']){
      if (this.filterForm.value[str]==true){
        tmp.push(str);
      }
    }
    this.checked=tmp;
    console.log(this.checked);
    // this.purchase=Object.assign([],...this.purchase)  
    const arr=this.purchase.slice();
    this.purchase=arr;
    console.log(this.purchase);
  }

}
