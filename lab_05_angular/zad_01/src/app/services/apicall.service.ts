import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Post } from '../post.model';
import { Photo } from '../photo.model';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { 
  }

  photos: Photo[] =[];

  getPosts(){
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'); 
  }

  getPhotos(){
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
  }

  addPost(postData:Post){
    return this.http.post('https://jsonplaceholder.typicode.com/posts', postData);
  }

  getPhoto(albumId:number,id:number, variable: Photo){
    this.getPhotos().subscribe((e)=>{
      this.photos=e;
      console.log("Service photos: ",this.photos);
      variable= (this.photos.filter((e)=> e.albumId===albumId && e.id === id) )[0]
    })
    // console.log("We got: ",(this.photos.filter((e)=> e.albumId===albumId && e.id === id) ))
    // return (this.photos.filter((e)=> e.albumId===albumId && e.id === id) )[0]
  }

}
