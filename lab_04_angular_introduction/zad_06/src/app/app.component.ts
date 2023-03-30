import { Component } from '@angular/core';
import { ServiceMove } from './service.move';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ServiceMove]
})
export class AppComponent {
  title = 'zad_06';

  Data: {header:string,desc:string}[]=[]

  constructor(private moveService : ServiceMove){
    this.Data=moveService.getData();
  }
  


}
