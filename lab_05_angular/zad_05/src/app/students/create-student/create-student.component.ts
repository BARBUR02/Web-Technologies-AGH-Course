import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;

  constructor(private StudentService: StudentService) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    console.log("Before creation:")
    console.log(this.student);
    this.StudentService.createStudent(this.student);
    console.log("After creation:")
    // this.student = new Student();
  }

  onSubmit() {
    console.log(this.student)
    this.submitted = true;
    this.save();
  }

}
