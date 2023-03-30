import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/photo.model';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent {
  @Input() photo : Photo;

  constructor(private router : Router){}

  onClick(){
    this.router.navigate(["/photos"+'/'+this.photo.albumId+'/'+this.photo.id])
  }

}
