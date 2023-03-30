import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Photo } from '../photo.model';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-singe-photo-view',
  templateUrl: './singe-photo-view.component.html',
  styleUrls: ['./singe-photo-view.component.css']
})
export class SingePhotoViewComponent implements OnInit {

  constructor (private dataService: ApicallService, private route : ActivatedRoute){}
  photo:Photo[];


  ngOnInit(): void {
    let albumId:number;
    let id:number;
    console.log(this.route.snapshot.params);
    this.route.params.subscribe(
      (params: Params)=>{
        console.log("Params: ",params);
        albumId=params['albumId'];
        id=params['id'];
        console.log(albumId)
        console.log(id)
        
        this.dataService.getPhotos().subscribe(photoTab=>{
        console.log("Photos: ",photoTab)
        this.photo = photoTab.filter(el=> el.albumId==albumId && el.id==id)  
        console.log("Photo loaded: ",this.photo)
    });

      }
    )

    
  }

}
