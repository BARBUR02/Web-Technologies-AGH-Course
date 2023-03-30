import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UpdateService } from 'src/app/services/update.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student: Student;

  constructor(private studentService: StudentService, private updateService : UpdateService,
    private router : Router) { }

  ngOnInit() {
  }

  deleteStudent() {
    console.log(this.student.key, " || Usuwamy ")
    this.studentService.deleteStudent(this.student.key);
  }

  modifyStudent(){
    this.updateService.studentToUpdate(this.student);
    this.router.navigate(['update']);
  }

}
