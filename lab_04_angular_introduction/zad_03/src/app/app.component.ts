import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zad_03';

  actor_name:string='';
  actor_surname: string='';
  filmTitle:string ='';

  
  onBtnClick(firstName: HTMLInputElement,lastName:HTMLInputElement,filmTitle:HTMLInputElement){
    this.actor_name=firstName.value;
    this.actor_surname=lastName.value;
    this.filmTitle=filmTitle.value;
  }


  

}
