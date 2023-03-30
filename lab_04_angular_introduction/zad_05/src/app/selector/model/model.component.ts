import { Component, Input } from '@angular/core';
import { Car } from 'src/app/car.model';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  @Input() model:string='';

}
