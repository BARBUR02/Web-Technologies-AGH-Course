import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Trip } from '../trip.model';
import { tripDataService } from '../tripdataservice';

@Component({
  selector: 'app-trip-add-form',
  templateUrl: './trip-add-form.component.html',
  styleUrls: ['./trip-add-form.component.css']
})
export class TripAddFormComponent implements OnInit {
  reactiveForm: FormGroup;
  invalidInfo:string='';
  constructor(private tripUpdateData: tripDataService){}
  accepted=0;

  ngOnInit(){
    this.reactiveForm = new FormGroup({
        name: new FormControl(null,  [Validators.required, Validators.pattern(/^[\p{L}]*[\s]*[\p{L}]*$/u)]),
        destination:new FormControl(null,[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*[\s]*[\p{L}]*$/u)]),
        places: new FormControl(null,Validators.min(1)),
        startDate:new FormControl(null,Validators.required),
        endDate:new FormControl(null,Validators.required),
        price: new FormControl(null,Validators.min(0)),
        description:new FormControl(null,Validators.required),
        img: new FormControl(null,Validators.required)
    });
    this.reactiveForm.reset();
    document.querySelector('.submit').addEventListener('click',
      ()=>{
       this.onSubmit();
      }
    );
  }
  onSubmit(){
    const el =document.querySelector('.invalid-info');
    // console.log(this.reactiveForm)
    console.log(this.reactiveForm.valid)
    console.log(this.reactiveForm.value)
    if (!this.reactiveForm.valid){
      this.invalidInfo='Unsuccesfull action\nCheck input data!';
      el.classList.add('not-accepted');
      el.classList.remove('accepted');
      setTimeout(()=>{
        el.classList.remove('not-accepted')
      },3000)
    }
    else {
      this.invalidInfo="Succesfully added trip!";
      this.tripUpdateData.addTrip(new Trip(this.reactiveForm.value));
      this.reactiveForm.reset();
      el.classList.add('accepted');
      el.classList.remove('not-accepted');
      setTimeout(()=>{
        el.classList.remove('accepted')
      },2000)
    }

  }

}
