import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { UpdateService } from 'src/app/services/update.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
 constructor(private updateService: UpdateService, private studentService : StudentService,
  private router: Router){}
  
 submitted = false;

 student : Student = new Student();
  ngOnInit(){
    
    this.student=this.updateService.studentHelp;
    console.log("We are updating id of :", this.student.key);
    this.updateService.studentClicked.subscribe((data: Student) =>{
      this.student = data;
      console.log("We are updating id of :", this.student.key)
    })
  }

  onSubmit(){
    this.studentService.updateStudent(this.student.key, this.student);
    this.router.navigate(['students']);
  } 
}
