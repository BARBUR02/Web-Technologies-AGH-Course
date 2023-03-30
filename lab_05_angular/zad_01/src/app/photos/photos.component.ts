import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo.model';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{
  photosList: Photo[] =[];
  
  constructor(private dataService: ApicallService){}
  
  ngOnInit(){
     this.dataService.getPhotos().subscribe(data=>{
      this.photosList=data;
     })
  }

}
