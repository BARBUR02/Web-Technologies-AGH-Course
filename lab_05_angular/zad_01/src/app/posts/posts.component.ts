import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postList : Post[];
  
  postAddForm : FormGroup;
  
  constructor(private dataService: ApicallService){

  }

  ngOnInit(){
    this.dataService.getPosts().subscribe(data=>{
      this.postList = data;
    });
    console.log(this.postList ? this.postList : 'Not loaded yet!');

    this.postAddForm= new FormGroup({
      'userId' : new FormControl(null, Validators.required),
      'id' : new FormControl(null,Validators.required),
      'title' : new FormControl(null,Validators.required),
      'body' : new FormControl(null,Validators.required),
    });

  }

  addPost(){
    if (this.postAddForm.valid){
      document.querySelector('.info').textContent="Succesfully Added!";
      document.querySelector('.info').classList.add('vis');
      document.querySelector('.info').classList.add('success');
      setTimeout(()=> document.querySelector('.info').classList.remove('vis'),2000);
      console.log('VALID')
      this.dataService.addPost(this.postAddForm.value).subscribe(()=>{
        console.log("Succesfully posted")
        this.dataService.getPosts().subscribe(data=>{
      this.postList = data;
      this.postList.push(this.postAddForm.value)
    });
      
      })
    }
    else{
      document.querySelector('.info').textContent="Unsuccesful action!";
      document.querySelector('.info').classList.add('vis');
      document.querySelector('.info').classList.add('fail');
      setTimeout(()=> document.querySelector('.info').classList.remove('vis'),2000);
    }
  }

}
