import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentsList().subscribe(res=>{
      this.students=res.map(e=>{
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Student
      })
    })
  }

  getStudentsList() {
      
  }

  deleteStudents() {
    this.students.forEach(student =>{
      this.studentService.deleteStudent(student.key);
    })
  }

}
